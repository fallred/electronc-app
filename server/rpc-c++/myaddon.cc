#include <node.h>

void Hello(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::String> message;
  if (!v8::String::NewFromUtf8(isolate, "Hello from C++").ToLocal(&message)) {
    return;
  }
  args.GetReturnValue().Set(message);
}

void Initialize(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "hello", Hello);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)