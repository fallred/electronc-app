# electron-quick-start-typescript

**Clone and run for a quick way to see Electron in action.**

This is a [TypeScript](https://www.typescriptlang.org) port of the [Electron Quick Start repo](https://github.com/electron/electron-quick-start) -- a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.ts` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start-typescript
# Go into the repository
cd electron-quick-start-typescript
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Re-compile automatically

To recompile automatically and to allow using [electron-reload](https://github.com/yan-foto/electron-reload), run this in a separate terminal:

```bash
npm run watch
```

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [Electron Fiddle](https://electronjs.org/fiddle) - create, play, and share small Electron experiments
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)


1.使用 Node.js 的 child_process 模块来启动和管理 C++ 进程，并通过 stdin/stdout 或 IPC 通道进行通信。在 TypeScript 中，你可以使用 Node.js 的 child_process.spawn 或 child_process.exec 函数来启动 C++ 进程，并通过 stdin 和 stdout 属性来进行输入输出操作。你还可以使用 Node.js 的 child_process.fork 函数来创建一个新的 Node.js 进程，并通过 IPC 通道与父进程进行通信。

在上面的示例中，我们使用 fork 方法启动了一个名为 mycppapp.js 的 Node.js 应用程序，并通过 IPC 通道与其通信。我们使用 child.send 方法向子进程发送了一条消息，并使用 child.on('message') 方法监听子进程的消息。当子进程退出时，我们还监听了 close 事件，并打印了退出码。

如果你需要在 C++ 应用程序中使用 IPC 通道与 Node.js 主进程通信，你可以使用 node-addon-api 模块编写一个 Node.js 插件，并在其中实现与 C++ 应用程序进行交互的逻辑。你可以将这个插件编译为共享库，并在 C++ 应用程序中加载和调用它，以便与 Node.js 主进程进行通信。

总之，你可以使用 Node.js 的 child_process 模块来启动和管理 C++ 进程，并通过标准输入/输出或 IPC 通道进行通信。如果你需要在 C++ 应用程序中使用 IPC 通道与 Node.js 主进程通信，你可以编写一个 Node.js 插件，并将其编译为共享库。然后，你可以在 C++ 应用程序中加载和调用这个插件，以便与 Node.js 主进程进行交互。

(1)myaddon.cc
```
import { spawn } from 'child_process';

const child = spawn('./myaddon');

child.stdout.on('data', (data: Buffer) => {
  const抱歉，之前的回答中代码部分还是被截断了。以下是完整的示例代码：

C++ 代码 (myaddon.cc)：

```cpp
#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <boost/serialization/serialization.hpp>
#include <boost/serialization/string.hpp>

using namespace std;

class MyAddon {
public:
    void run() {
        string name;
        while (getline(cin, name)) {
            cout << "Hello, " << name << "!" << endl;
            this_thread::sleep_for(chrono::seconds(1));
        }
    }
};

MyAddon myAddon;

int main() {
    myAddon.run();
    return 0;
}
```

```
#include <grpc++/grpc++.h>

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;

class MyServiceImpl final : public MyService::Service {
 public:
  Status SayHello(ServerContext* context, const HelloRequest* request,
                  HelloReply* reply) override {
    reply->set_message("Hello " + request->name() + "!");
    return Status::OK;
  }
};

void RunServer() {
  std::string server_address("0.0.0.0:50051");
  MyServiceImpl service;

  ServerBuilder builder;
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
  builder.RegisterService(&service);
  std::unique_ptr<Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address << std::endl;
  server->Wait();
}

int main(int argc, char** argv) {
  RunServer();
  return 0;
}
```
(2)node主进程
```
import { spawn } from 'child_process';

const child = spawn('./myaddon');

child.stdout.on('data', (data: Buffer) => {
  const message = data.toString().trim();
  console.log(`Received message: ${message}`);
});

child.stdin.write('World\n');
child.stdin.write('Electron\n');

setTimeout(() => {
  child.stdin.end();
  console.log('Child process exited');
}, 5000);
```

```
const { spawn } = require('child_process');

const child = spawn('./myapp', ['--port', '50051']);

child.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

child.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
```
(3)执行g++ -o myaddon1 myaddon1.cc 报错,编译c++文件。
myaddon1.cc:1:10: fatal error: 'grpc++/grpc++.h' file not found
#include <grpc++/grpc++.h>
^~~~~~~~~~~~~~~~~
（4）brew install grpc 需要安装grpc库，您需要确保g++编译器能够找到gRPC C++库的头文件
./bin/bash -c "$(curl -fsSL http://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

/bin/bash -c /Users/zhangqiuhong/code/electronc-app/server/doc/homebrew.sh

2.使用 Node.js 的 C++ 插件机制，将 C++ 代码编译为 Node.js 模块，并在 TypeScript 中直接引用。你可以使用 node-gyp 工具将 C++ 代码编译为 Node.js 模块，并在 TypeScript 中使用 require 或 import 语句直接引用该模块。在 C++ 代码中，你可以使用 Node.js 的 C++ API 来与Electron 是一个基于 Chromium 和 Node.js 的桌面应用程序开发框架，可以使用 TypeScript 来编写应用程序。如果你需要在 Electron 应用程序中实现与 C++ RPC 协议的通信，你可以考虑使用以下方案：
(1)myaddon.cc
```
#include <node.h>

void Hello(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  args->Return(v8::String::NewFromUtf8(isolate, "Hello from C++"));
}

void Initialize(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "hello", Hello);
}
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
```

(2)binding.gyp文件
```
{
  "targets": [
    {
      "target_name": "myaddon",
      "sources": [ "myaddon.cc" ]
    }
  ]
}
```
(3)编译.cc文件，生成build/Release/myaddon.node
node-gyp clean
node-gyp configure
node-gyp build
(4) 运行结果
image.png
App threw an error during load
Error: The module '/Users/zhangqiuhong/code/electronc-app/server/build/Release/myaddon.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 108. This version of Node.js requires
NODE_MODULE_VERSION 114. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
    at process.func [as dlopen] (node:electron/js2c/asar_bundle:2:1822)
    at Module._extensions..node (node:internal/modules/cjs/loader:1326:18)
    at Object.func [as .node] (node:electron/js2c/asar_bundle:2:1822)
    at Module.load (node:internal/modules/cjs/loader:1096:32)
    at Module._load (node:internal/modules/cjs/loader:937:12)
    at f._load (node:electron/js2c/asar_bundle:2:13330)
    at Module.require (node:internal/modules/cjs/loader:1120:19)
    at require (node:internal/modules/cjs/helpers:103:18)


3.python rpc 通信测试
python3 server.py
python3 client.py

（1）确认您的 Python 环境已经安装了 pip 包管理器。如果您还没有安装 pip，可以通过以下命令安装：

dsconfig
Copy
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo python get-pip.py
```

（2）使用 pip 安装 gRPC 工具包。您可以使用以下命令来安装：

Copy
pip install grpcio-tools
```

如果您使用的是 Python 2.x 版本，可以使用以下命令来安装：
pip install grpcio-tools==1.37.1

注意：由于 gRPC 版本的更新，最新的 gRPC 工具包可能不支持 Python 2.x 版本。如果您的 Python 版本为 2.x，建议使用上述命令安装指定版本的 gRPC 工具包。

安装完成后，重新运行您的命令：

Copy
python -m grpc_tools.protoc -I. --python_out=. --grpc_tools_python_out=. example.proto
```

这应该可以正常工作了。如果仍然出现问题，请检查您的 Python 环境变量设置是否正确，并确保 gRPC 工具包已正确安装。