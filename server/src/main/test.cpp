#include "electron_rpc.h"

void foo() {
  // some code here
  electron_rpc::call("myFunction", arg1, arg2, ...);
  // more code here
}