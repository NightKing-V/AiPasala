import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'llama_ffi.dart';

void main() {
  initLlama();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dataset Creator',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.indigo,
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),
      ),
      home: const DatasetCreatorPage(),
    );
  }
}

class DatasetCreatorPage extends StatefulWidget {
  const DatasetCreatorPage({super.key});

  @override
  State<DatasetCreatorPage> createState() => _DatasetCreatorPageState();
}

class _DatasetCreatorPageState extends State<DatasetCreatorPage> {
  final TextEditingController _sinhalaController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  String _currentEnglishSentence = '';
  List<Map<String, String>> _dataset = [];
  bool _isGenerating = false;
  bool _isSaving = false;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadDataset();
  }

  @override
  void dispose() {
    _sinhalaController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _generateEnglishSentence() async {
    setState(() {
      _isGenerating = true;
    });

    try {
      // Replace this with your actual LLM generation call
      // Example: _currentEnglishSentence = await generateSentence();

      // Simulated generation for demo purposes
      await Future.delayed(const Duration(seconds: 1));

      // You would replace this with your actual LLM call
      const sampleSentences = [
        "The weather is beautiful today.",
        "I love reading books in the morning.",
        "Technology has changed our lives significantly.",
        "Music brings people together across cultures.",
        "Learning new languages opens many opportunities.",
      ];

      setState(() {
        _currentEnglishSentence = sampleSentences[
        DateTime.now().millisecondsSinceEpoch % sampleSentences.length
        ];
      });
    } catch (e) {
      _showErrorSnackBar('Error generating sentence: $e');
    } finally {
      setState(() {
        _isGenerating = false;
      });
    }
  }

  Future<void> _savePair() async {
    if (_currentEnglishSentence.isEmpty || _sinhalaController.text.trim().isEmpty) {
      _showErrorSnackBar('Please provide both English and Sinhala sentences');
      return;
    }

    final pair = {
      'english': _currentEnglishSentence,
      'sinhala': _sinhalaController.text.trim(),
      'timestamp': DateTime.now().toIso8601String(),
    };

    setState(() {
      _dataset.add(pair);
      _currentIndex = _dataset.length;
      _sinhalaController.clear();
      _currentEnglishSentence = '';
    });

    await _saveDatasetToFile();
    _showSuccessSnackBar('Pair saved successfully!');
  }

  Future<void> _saveDatasetToFile() async {
    setState(() {
      _isSaving = true;
    });

    try {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/translation_dataset.json');

      final jsonString = const JsonEncoder.withIndent('  ').convert({
        'dataset': _dataset,
        'total_pairs': _dataset.length,
        'last_updated': DateTime.now().toIso8601String(),
      });

      await file.writeAsString(jsonString);
    } catch (e) {
      _showErrorSnackBar('Error saving dataset: $e');
    } finally {
      setState(() {
        _isSaving = false;
      });
    }
  }

  Future<void> _loadDataset() async {
    try {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/translation_dataset.json');

      if (await file.exists()) {
        final jsonString = await file.readAsString();
        final jsonData = jsonDecode(jsonString);

        setState(() {
          _dataset = List<Map<String, String>>.from(
              jsonData['dataset'].map((item) => Map<String, String>.from(item))
          );
          _currentIndex = _dataset.length;
        });
      }
    } catch (e) {
      _showErrorSnackBar('Error loading dataset: $e');
    }
  }

  Future<void> _exportDataset() async {
    if (_dataset.isEmpty) {
      _showErrorSnackBar('No data to export');
      return;
    }

    try {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/exported_dataset_${DateTime.now().millisecondsSinceEpoch}.json');

      final jsonString = const JsonEncoder.withIndent('  ').convert({
        'dataset': _dataset,
        'total_pairs': _dataset.length,
        'exported_at': DateTime.now().toIso8601String(),
      });

      await file.writeAsString(jsonString);
      _showSuccessSnackBar('Dataset exported to ${file.path}');
    } catch (e) {
      _showErrorSnackBar('Error exporting dataset: $e');
    }
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dataset Creator'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          IconButton(
            icon: const Icon(Icons.download),
            onPressed: _exportDataset,
            tooltip: 'Export Dataset',
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Stats Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      children: [
                        Text(
                          '${_dataset.length}',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: Theme.of(context).colorScheme.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Text('Total Pairs'),
                      ],
                    ),
                    Column(
                      children: [
                        Text(
                          '#${_currentIndex + 1}',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: Theme.of(context).colorScheme.secondary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Text('Current'),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Generate Button
            FilledButton.icon(
              onPressed: _isGenerating ? null : _generateEnglishSentence,
              icon: _isGenerating
                  ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              )
                  : const Icon(Icons.auto_awesome),
              label: Text(_isGenerating ? 'Generating...' : 'Generate English Sentence'),
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),

            const SizedBox(height: 20),

            // English Sentence Display
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.language, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'English Sentence',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const Spacer(),
                        if (_currentEnglishSentence.isNotEmpty)
                          IconButton(
                            icon: const Icon(Icons.copy, size: 20),
                            onPressed: () {
                              Clipboard.setData(ClipboardData(text: _currentEnglishSentence));
                              _showSuccessSnackBar('Copied to clipboard');
                            },
                          ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.surfaceVariant,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        _currentEnglishSentence.isEmpty
                            ? 'Click "Generate English Sentence" to start'
                            : _currentEnglishSentence,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          fontStyle: _currentEnglishSentence.isEmpty ? FontStyle.italic : null,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Sinhala Input
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.translate, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'Sinhala Translation',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _sinhalaController,
                      maxLines: 3,
                      decoration: const InputDecoration(
                        hintText: 'Enter Sinhala translation here...',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Save Button
            FilledButton.icon(
              onPressed: _isSaving ? null : _savePair,
              icon: _isSaving
                  ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              )
                  : const Icon(Icons.save),
              label: Text(_isSaving ? 'Saving...' : 'Save Pair'),
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Colors.green,
              ),
            ),

            const SizedBox(height: 20),

            // Recent Pairs
            if (_dataset.isNotEmpty) ...[
              Text(
                'Recent Pairs',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Expanded(
                child: Card(
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(8),
                    itemCount: _dataset.length,
                    reverse: true,
                    itemBuilder: (context, index) {
                      final pair = _dataset[_dataset.length - 1 - index];
                      return ListTile(
                        leading: CircleAvatar(
                          child: Text('${_dataset.length - index}'),
                        ),
                        title: Text(
                          pair['english']!,
                          style: const TextStyle(fontWeight: FontWeight.w500),
                        ),
                        subtitle: Text(pair['sinhala']!),
                        dense: true,
                      );
                    },
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}