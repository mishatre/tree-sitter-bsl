#include <tree_sitter/parser.h>

#include <wctype.h>

enum TokenType {
  MILTILINE_CHAR,
  IF_STATEMENT,
  ASSIGNMENT_EXPRESSION,
  BINARY_EXPRESSION
};

void * tree_sitter_bsl_external_scanner_create() { return NULL; }
void tree_sitter_bsl_external_scanner_destroy(void *payload) {}
void tree_sitter_bsl_external_scanner_reset(void *p) {}
unsigned tree_sitter_bsl_external_scanner_serialize(void *p, char *buffer) { return 0; }
void tree_sitter_bsl_external_scanner_deserialize(void *p, const char *b, unsigned n) {}

bool tree_sitter_bsl_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
    if (valid_symbols[MILTILINE_CHAR] && lexer->lookahead == '\n') {
        while (iswspace(lexer->lookahead)) {
            lexer->advance(lexer, true);
        }
        if (lexer->lookahead == '|') {
            lexer->advance(lexer, true);
            lexer->result_symbol = MILTILINE_CHAR;
            lexer->mark_end(lexer);
            return true;
        }
    }
    if (valid_symbols[IF_STATEMENT]) {
        if(valid_symbols[ASSIGNMENT_EXPRESSION] && valid_symbols[BINARY_EXPRESSION]) {
            lexer->result_symbol = BINARY_EXPRESSION;
            return true;
        }

    }
    return false;
}