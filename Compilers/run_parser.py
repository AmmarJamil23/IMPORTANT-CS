from simple_ast import Parser
from tiny_lexer import tokenize
from codegen import CodeGen
from vm import VM

code = """
x = 10 + 20
print x * 3
"""

tokens = tokenize(code)
parser = Parser(tokens)
ast = parser.parse()

print("AST:")
for node in ast:
    print(node)

gen = CodeGen()
bytecode = gen.generate(ast)

print("\nBYTECODE:")
print(bytecode)

print("\nOUTPUT:")
vm = VM(bytecode)
vm.run()