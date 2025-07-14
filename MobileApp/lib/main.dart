import 'package:flutter/material.dart';
// Import your llama wrapper file
import 'llama_ffi.dart'; // Adjust path as needed

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Llama Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final LlamaWrapper _llama = LlamaWrapper();
  bool _isInitialized = false;
  bool _isModelLoaded = false;
  String _output = '';
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _initializeLlama();
  }

  Future<void> _initializeLlama() async {
    try {
      // Initialize the llama backend
      final initialized = _llama.initialize();

      if (initialized) {
        setState(() {
          _isInitialized = true;
          _output = 'Llama backend initialized successfully!';
        });

        // Try to load a model (you'll need to provide the actual path)
        await _loadModel('/path/to/your/model.gguf');
      } else {
        setState(() {
          _output = 'Failed to initialize Llama backend';
        });
      }
    } catch (e) {
      setState(() {
        _output = 'Error initializing Llama: $e';
      });
    }
  }

  Future<void> _loadModel(String modelPath) async {
    try {
      final loaded = _llama.loadModel(modelPath);

      if (loaded) {
        setState(() {
          _isModelLoaded = true;
          _output = 'Model loaded successfully!';
        });
      } else {
        setState(() {
          _output = 'Failed to load model';
        });
      }
    } catch (e) {
      setState(() {
        _output = 'Error loading model: $e';
      });
    }
  }

  Future<void> _generateText() async {
    if (!_isInitialized || !_isModelLoaded) {
      setState(() {
        _output = 'Please initialize and load a model first';
      });
      return;
    }

    final prompt = _controller.text;
    if (prompt.isEmpty) {
      setState(() {
        _output = 'Please enter a prompt';
      });
      return;
    }

    try {
      setState(() {
        _output = 'Generating...';
      });

      final response = _llama.generate(prompt, 50);

      setState(() {
        _output = response ?? 'No response generated';
      });
    } catch (e) {
      setState(() {
        _output = 'Error generating text: $e';
      });
    }
  }

  @override
  void dispose() {
    _llama.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Llama Flutter Demo'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Status:', style: TextStyle(fontWeight: FontWeight.bold)),
                    Text('Initialized: ${_isInitialized ? 'Yes' : 'No'}'),
                    Text('Model Loaded: ${_isModelLoaded ? 'Yes' : 'No'}'),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                labelText: 'Enter your prompt',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isInitialized && _isModelLoaded ? _generateText : null,
              child: Text('Generate Text'),
            ),
            SizedBox(height: 16),
            Expanded(
              child: Card(
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: SingleChildScrollView(
                    child: Text(
                      _output,
                      style: TextStyle(fontFamily: 'monospace'),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}