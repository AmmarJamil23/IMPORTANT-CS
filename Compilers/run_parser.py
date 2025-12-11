from simple_ast import Parser
from tiny_lexer import tokenize

code = """
x = 10 + 20
print x * 3
"""

tokens = tokenize(code)
print("TOKENS", tokens)

parser = Parser(tokens)
ast = parser.parse()

print("AST:")
for node in ast:
    print(node)