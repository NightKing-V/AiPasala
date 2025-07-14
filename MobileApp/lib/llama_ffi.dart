import 'dart:ffi';
import 'dart:io';
import 'package:ffi/ffi.dart';

// Load the shared library
final DynamicLibrary llamaLib = Platform.isAndroid
    ? DynamicLibrary.open('libllama.so')
    : DynamicLibrary.process();

// Define opaque struct types
base class LlamaModel extends Opaque {}
base class LlamaContext extends Opaque {}

// Define the model parameters struct
base class LlamaModelParams extends Struct {
  @Int32()
  external int n_gpu_layers;

  @Int32()
  external int main_gpu;

  @Bool()
  external bool vocab_only;

  @Bool()
  external bool use_mmap;

  @Bool()
  external bool use_mlock;

// Add other fields as needed
}

// Define the context parameters struct
base class LlamaContextParams extends Struct {
  @Uint32()
  external int n_ctx;

  @Uint32()
  external int n_batch;

  @Uint32()
  external int n_threads;

  @Uint32()
  external int n_threads_batch;

  @Float()
  external double rope_freq_base;

  @Float()
  external double rope_freq_scale;

// Add other fields as needed
}

// Native function signatures
typedef LlamaBackendInitNative = Void Function();
typedef LlamaBackendFreeNative = Void Function();

typedef LlamaModelDefaultParamsNative = LlamaModelParams Function();
typedef LlamaContextDefaultParamsNative = LlamaContextParams Function();

typedef LlamaLoadModelFromFileNative = Pointer<LlamaModel> Function(
    Pointer<Utf8> pathModel, LlamaModelParams params);

typedef LlamaNewContextWithModelNative = Pointer<LlamaContext> Function(
    Pointer<LlamaModel> model, LlamaContextParams params);

typedef LlamaFreeModelNative = Void Function(Pointer<LlamaModel> model);
typedef LlamaFreeContextNative = Void Function(Pointer<LlamaContext> ctx);

typedef LlamaTokenizeNative = Int32 Function(
    Pointer<LlamaModel> model,
    Pointer<Utf8> text,
    Int32 textLen,
    Pointer<Int32> tokens,
    Int32 nMaxTokens,
    Bool addBos,
    Bool special);

typedef LlamaDecodeNative = Int32 Function(
    Pointer<LlamaContext> ctx,
    Pointer<Int32> tokens,
    Int32 nTokens,
    Int32 nPast);

typedef LlamaGetLogitsNative = Pointer<Float> Function(Pointer<LlamaContext> ctx);

typedef LlamaSampleTokenGreedyNative = Int32 Function(
    Pointer<LlamaContext> ctx,
    Pointer<Float> logits);

typedef LlamaTokenToStrNative = Pointer<Utf8> Function(
    Pointer<LlamaModel> model, Int32 token);

// Dart function signatures
typedef LlamaBackendInit = void Function();
typedef LlamaBackendFree = void Function();
typedef LlamaModelDefaultParams = LlamaModelParams Function();
typedef LlamaContextDefaultParams = LlamaContextParams Function();
typedef LlamaLoadModelFromFile = Pointer<LlamaModel> Function(
    Pointer<Utf8> pathModel, LlamaModelParams params);
typedef LlamaNewContextWithModel = Pointer<LlamaContext> Function(
    Pointer<LlamaModel> model, LlamaContextParams params);
typedef LlamaFreeModel = void Function(Pointer<LlamaModel> model);
typedef LlamaFreeContext = void Function(Pointer<LlamaContext> ctx);
typedef LlamaTokenize = int Function(
    Pointer<LlamaModel> model,
    Pointer<Utf8> text,
    int textLen,
    Pointer<Int32> tokens,
    int nMaxTokens,
    bool addBos,
    bool special);
typedef LlamaDecode = int Function(
    Pointer<LlamaContext> ctx,
    Pointer<Int32> tokens,
    int nTokens,
    int nPast);
typedef LlamaGetLogits = Pointer<Float> Function(Pointer<LlamaContext> ctx);
typedef LlamaSampleTokenGreedy = int Function(
    Pointer<LlamaContext> ctx,
    Pointer<Float> logits);
typedef LlamaTokenToStr = Pointer<Utf8> Function(
    Pointer<LlamaModel> model, int token);

// Bind the functions
final LlamaBackendInit llamaBackendInit = llamaLib
    .lookupFunction<LlamaBackendInitNative, LlamaBackendInit>('llama_backend_init');

final LlamaBackendFree llamaBackendFree = llamaLib
    .lookupFunction<LlamaBackendFreeNative, LlamaBackendFree>('llama_backend_free');

final LlamaModelDefaultParams llamaModelDefaultParams = llamaLib
    .lookupFunction<LlamaModelDefaultParamsNative, LlamaModelDefaultParams>(
    'llama_model_default_params');

final LlamaContextDefaultParams llamaContextDefaultParams = llamaLib
    .lookupFunction<LlamaContextDefaultParamsNative, LlamaContextDefaultParams>(
    'llama_context_default_params');

final LlamaLoadModelFromFile llamaLoadModelFromFile = llamaLib
    .lookupFunction<LlamaLoadModelFromFileNative, LlamaLoadModelFromFile>(
    'llama_load_model_from_file');

final LlamaNewContextWithModel llamaNewContextWithModel = llamaLib
    .lookupFunction<LlamaNewContextWithModelNative, LlamaNewContextWithModel>(
    'llama_new_context_with_model');

final LlamaFreeModel llamaFreeModel = llamaLib
    .lookupFunction<LlamaFreeModelNative, LlamaFreeModel>('llama_free_model');

final LlamaFreeContext llamaFreeContext = llamaLib
    .lookupFunction<LlamaFreeContextNative, LlamaFreeContext>('llama_free');

final LlamaTokenize llamaTokenize = llamaLib
    .lookupFunction<LlamaTokenizeNative, LlamaTokenize>('llama_tokenize');

final LlamaDecode llamaDecode = llamaLib
    .lookupFunction<LlamaDecodeNative, LlamaDecode>('llama_decode');

final LlamaGetLogits llamaGetLogits = llamaLib
    .lookupFunction<LlamaGetLogitsNative, LlamaGetLogits>('llama_get_logits');

final LlamaSampleTokenGreedy llamaSampleTokenGreedy = llamaLib
    .lookupFunction<LlamaSampleTokenGreedyNative, LlamaSampleTokenGreedy>(
    'llama_sample_token_greedy');

final LlamaTokenToStr llamaTokenToStr = llamaLib
    .lookupFunction<LlamaTokenToStrNative, LlamaTokenToStr>('llama_token_to_str');

// High-level wrapper class
class LlamaWrapper {
  Pointer<LlamaModel>? _model;
  Pointer<LlamaContext>? _context;

  bool initialize() {
    try {
      llamaBackendInit();
      return true;
    } catch (e) {
      print('Failed to initialize llama backend: $e');
      return false;
    }
  }

  bool loadModel(String modelPath) {
    try {
      final pathPtr = modelPath.toNativeUtf8();
      final modelParams = llamaModelDefaultParams();

      _model = llamaLoadModelFromFile(pathPtr, modelParams);
      malloc.free(pathPtr);

      if (_model == nullptr) {
        print('Failed to load model');
        return false;
      }

      final contextParams = llamaContextDefaultParams();
      contextParams.n_ctx = 2048; // Set context size

      _context = llamaNewContextWithModel(_model!, contextParams);

      if (_context == nullptr) {
        print('Failed to create context');
        return false;
      }

      return true;
    } catch (e) {
      print('Error loading model: $e');
      return false;
    }
  }

  List<int> tokenize(String text, bool addBos) {
    if (_model == nullptr) return [];

    final textPtr = text.toNativeUtf8();
    final maxTokens = text.length + (addBos ? 1 : 0);
    final tokensPtr = malloc<Int32>(maxTokens);

    try {
      final nTokens = llamaTokenize(
          _model!,
          textPtr,
          text.length,
          tokensPtr,
          maxTokens,
          addBos,
          false
      );

      if (nTokens < 0) return [];

      final tokens = <int>[];
      for (int i = 0; i < nTokens; i++) {
        tokens.add(tokensPtr[i]);
      }

      return tokens;
    } finally {
      malloc.free(textPtr);
      malloc.free(tokensPtr);
    }
  }

  String? generate(String prompt, int maxTokens) {
    if (_model == nullptr || _context == nullptr) return null;

    final tokens = tokenize(prompt, true);
    if (tokens.isEmpty) return null;

    final result = StringBuffer();
    final tokensPtr = malloc<Int32>(tokens.length);

    try {
      for (int i = 0; i < tokens.length; i++) {
        tokensPtr[i] = tokens[i];
      }

      // Process prompt tokens
      final decodeResult = llamaDecode(_context!, tokensPtr, tokens.length, 0);
      if (decodeResult != 0) {
        print('Failed to decode prompt');
        return null;
      }

      // Generate tokens
      for (int i = 0; i < maxTokens; i++) {
        final logits = llamaGetLogits(_context!);
        final nextToken = llamaSampleTokenGreedy(_context!, logits);

        if (nextToken == 0) break; // EOS token

        final tokenStrPtr = llamaTokenToStr(_model!, nextToken);
        if (tokenStrPtr != nullptr) {
          result.write(tokenStrPtr.toDartString());
        }

        // Prepare for next iteration
        tokensPtr[0] = nextToken;
        final nextDecodeResult = llamaDecode(_context!, tokensPtr, 1, tokens.length + i);
        if (nextDecodeResult != 0) break;
      }

      return result.toString();
    } finally {
      malloc.free(tokensPtr);
    }
  }

  void dispose() {
    if (_context != nullptr) {
      llamaFreeContext(_context!);
      _context = nullptr;
    }
    if (_model != nullptr) {
      llamaFreeModel(_model!);
      _model = nullptr;
    }
    llamaBackendFree();
  }
}

// Example usage
void main() {
  final llama = LlamaWrapper();

  if (!llama.initialize()) {
    print('Failed to initialize llama');
    return;
  }

  if (!llama.loadModel('/path/to/your/model.gguf')) {
    print('Failed to load model');
    llama.dispose();
    return;
  }

  final response = llama.generate('Hello, how are you?', 50);
  print('Generated text: $response');

  llama.dispose();
}