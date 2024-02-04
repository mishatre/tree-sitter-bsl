[
  ","
  "="
  "<>"
  "-"
  "+"
  "/"
  "*"
] @operator

[
  "function"
  "end_function"
  "procedure"
  "end_procedure"
  "export"
  "val"
  "if"
  "else"
  "elsif"
  "then"
  "end_if"
  "for"
  "each"
  "in"
  "to"
  "do"
  "end_do"
  "try"
  "except"
  "end_try"
  "return"
  "break"
  "continue"
  "true"
  "false"
  "undefined"
  "null"
  "raise"
  "not"
  "or"
  "and"
  "while"
  "new"
] @keyword

(preproc_region
  name: (identifier) @entity.name.section) @keyword.other.section
(preproc_if
  condition: (_) @entity.condition.preprocessor
) @keyword.other.preprocessor

(variable_declaration
  (variable_declarator
    name: (identifier) @variable.builtin
    modifier: (modifier) @keyword.modifier)) @keyword.variable

(variable_declaration
  (variable_declarator
    name: (identifier) @variable.builtin)) @keyword.variable

(assignment_expression
    left: (identifier) @identifier)

(call_expression) @identifier

(comment) @comment

(function_declaration
  (directive) @keyword.modifier.directive
  name: (identifier) @function
  parameters: (parameter_list
    (parameter_declaration
      (modifier)
      parameter: (identifier) @attribute))
)
(function_declaration
  (directive) @keyword.modifier.directive
  name: (identifier) @function
  parameters: (parameter_list
    (parameter_declaration
      parameter: (identifier) @attribute))
)

(number) @number
(string) @string
(date) @string.special