class VM:
    def __init__(self):
        self.stack = []
        self.ip = 0
        self.program = []
    
    def run(self):
        while self.ip < len(self.program):
            instr = self.program[self.ip]

            if instr[0] == "PUSH":
                self.stack.append(instr[1])

            elif instr[0] == "ADD":
                b = self.stack.pop()
                a = self.stack.pop()
                self.stack.append(a + b)

            elif instr[0] == "PRINT":
                print(self.stack.pop())

            elif instr[0] == "HALT":
                break
            
            self.ip += 1


vm = VM()
vm.program = [
    ("PUSH", 5),
    ("PUSH", 3),
    ("ADD",),
    ("PRINT",),
    ("HALT",)
]

vm.run()
