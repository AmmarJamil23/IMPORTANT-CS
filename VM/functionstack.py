from typing import List

PUSH = 1
ADD = 2
PRINT = 3
CALL = 4
RET = 5
HALT = 0

class VM:
    def __init__(self, code: List[int]):
        self.code = code
        self.ip = 0
        self.stack = []
        self.call_stack = []


    def run(self):
        while True:
            op = self.code[self.ip]
            self.ip += 1

            if op == HALT:
                break

            elif op == PUSH:
                value = self.code[self.ip]
                self.ip += 1
                self.stack.append(value)

            elif op == ADD:
                a = self.stack.pop()
                b = self.stack.pop()
                self.stack.append(a + b)

            elif op == PRINT:
                print(self.stack.pop())

            elif op == CALL:
                addr = self.code[self.ip]
                self.ip += 1

                self.call_stack.append(self.ip)

                self.ip = addr

            elif op == RET:

                self.ip = self.call_stack.pop()

            else:
                raise ValueError("Unknown opcode:", op)



program = [
    CALL, 4,
    PRINT,
    HALT,

    PUSH,2,
    PUSH, 5,
    ADD,
    RET
]

if __name__ == "__main__":
    VM(program).run()