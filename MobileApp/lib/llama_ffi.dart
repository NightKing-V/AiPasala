import 'dart:ffi';
import 'dart:io';

// Load the shared library
final DynamicLibrary llamaLib = Platform.isAndroid
    ? DynamicLibrary.open('libllama.so')
    : DynamicLibrary.process();

// Example: Define a C function signature and Dart function to call it
// (replace with real llama.cpp exported functions and signatures)

typedef llama_init_native = Void Function();
typedef LlamaInit = void Function();

final LlamaInit llamaInit = llamaLib
    .lookupFunction<llama_init_native, LlamaInit>('llama_init');

void initLlama() {
  llamaInit();
}
