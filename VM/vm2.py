from typing import List


# Opcodes names mapped to numbers
PUSH = 1
ADD = 2
SUB = 3
MUL = 4
DIV = 5
PRINT = 6
JZ = 7
HALT = 0


class VM:
    def __init__(self, code: List[int]):
        self.code = code
        self.ip = 0
        self.stack: List[float] = []


    def run(self):
        while True:

            op = self.code[self.ip]
            self.ip += 1

            if op == HALT:
                break

            elif op == PUSH:
                value = self.code[self.ip]
                self.ip += 1
                self.stack.append(float(value))

            elif op == ADD:
                a = self.stack.pop()
                b = self.stack.pop()
                self.stack.append(b + a)

            elif op == SUB:
                a = self.stack.pop()
                b = self.stack.pop()
                self.stack.append(b - a)

            elif op == MUL:
                a = self.stack.pop()
                b = self.stack.pop()
                self.stack.append(b * a)

            elif op == DIV:
                a = self.stack.pop()
                b = self.stack.pop()
                self.stack.append(b / a)

            elif op == PRINT:
                a = self.stack.pop()
                print(a)

            elif op == JZ:
                addr = int(self.code[self.ip])
                self.ip += 1
                a = self.stack.pop()
                if a == 0:
                    self.ip = addr

            else: 
                raise ValueError("Unknown opcode" + str(op))


program = [
    PUSH, 10,
    PUSH, 3,
    SUB,
    PUSH, 8,
    DIV,
    PRINT,
    HALT
]

# program = [
#    PUSH, 5,

#    PUSH, 1,
#    SUB,

#    PUSH, 0,
#    JZ, 18,

#    PUSH, 1,
#    JZ, 2,

#    PRINT,
#    HALT

# ]

if __name__ == "__main__":
    vm = VM(program)
    vm.run()