"use strict";
var parser = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var grammar_exports = {};
  __export(grammar_exports, {
    default: () => grammar_default
  });
  const keyword = {
    region: "Region|\u041E\u0431\u043B\u0430\u0441\u0442\u044C",
    end_region: "EndRegion|\u041A\u043E\u043D\u0435\u0446\u041E\u0431\u043B\u0430\u0441\u0442\u0438",
    var: "Var|\u041F\u0435\u0440\u0435\u043C",
    export: "Export|\u042D\u043A\u0441\u043F\u043E\u0440\u0442",
    val: "Val|\u0417\u043D\u0430\u0447",
    new: "New|\u041D\u043E\u0432\u044B\u0439",
    not: "Not|\u041D\u0435",
    or: "Or|\u0418\u043B\u0438",
    and: "And|\u0418",
    then: "Then|\u0422\u043E\u0433\u0434\u0430",
    if: "If|\u0415\u0441\u043B\u0438",
    elsif: "ElsIf|\u0418\u043D\u0430\u0447\u0435\u0415\u0441\u043B\u0438",
    else: "Else|\u0418\u043D\u0430\u0447\u0435",
    end_if: "EndIf|\u041A\u043E\u043D\u0435\u0446\u0415\u0441\u043B\u0438",
    while: "While|\u041F\u043E\u043A\u0430",
    for: "For|\u0414\u043B\u044F",
    each: "Each|\u041A\u0430\u0436\u0434\u043E\u0433\u043E",
    in: "In|\u0418\u0437",
    to: "To|\u041F\u043E",
    do: "Do|\u0426\u0438\u043A\u043B",
    continue: "Continue|\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
    break: "Break|\u041F\u0440\u0435\u0440\u0432\u0430\u0442\u044C",
    end_do: "EndDo|\u041A\u043E\u043D\u0435\u0446\u0426\u0438\u043A\u043B\u0430",
    function: "Function|\u0424\u0443\u043D\u043A\u0446\u0438\u044F",
    end_function: "EndFunction|\u041A\u043E\u043D\u0435\u0446\u0424\u0443\u043D\u043A\u0446\u0438\u0438",
    procedure: "Procedure|\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430",
    end_procedure: "EndProcedure|\u041A\u043E\u043D\u0435\u0446\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u044B",
    return: "Return|\u0412\u043E\u0437\u0432\u0440\u0430\u0442",
    try: "Try|\u041F\u043E\u043F\u044B\u0442\u043A\u0430",
    except: "Except|\u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
    end_try: "EndTry|\u041A\u043E\u043D\u0435\u0446\u041F\u043E\u043F\u044B\u0442\u043A\u0438",
    raise: "Raise|\u0412\u044B\u0437\u0432\u0430\u0442\u044C\u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
    async: "Async|\u0410\u0441\u0438\u043D\u0445",
    await: "Await|\u0416\u0434\u0430\u0442\u044C",
    client: make_keyword("Client|\u041A\u043B\u0438\u0435\u043D\u0442"),
    at_client: make_keyword("AtClient|\u041D\u0430\u041A\u043B\u0438\u0435\u043D\u0442\u0435"),
    at_server: make_keyword("AtServer|\u041D\u0430\u0421\u0435\u0440\u0432\u0435\u0440\u0435"),
    server: make_keyword("Server|\u0421\u0435\u0440\u0432\u0435\u0440"),
    thin_client: make_keyword("ThinClient|\u0422\u043E\u043D\u043A\u0438\u0439\u041A\u043B\u0438\u0435\u043D\u0442"),
    web_client: make_keyword("WebClient|\u0412\u0435\u0431\u041A\u043B\u0438\u0435\u043D\u0442"),
    mobile_standalone_server: make_keyword("MobileStandaloneServer|\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439\u0410\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u044B\u0439\u0421\u0435\u0440\u0432\u0435\u0440"),
    mobile_app_client: make_keyword("MobileAppClient|\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u041A\u043B\u0438\u0435\u043D\u0442"),
    mobile_app_server: make_keyword("MobileAppServer|\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u0421\u0435\u0440\u0432\u0435\u0440"),
    mobile_client: make_keyword("MobileClient|\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439\u041A\u043B\u0438\u0435\u043D\u0442"),
    thick_client_ordinary_application: make_keyword(
      "ThickClientOrdinaryApplication|\u0422\u043E\u043B\u0441\u0442\u044B\u0439\u041A\u043B\u0438\u0435\u043D\u0442\u041E\u0431\u044B\u0447\u043D\u043E\u0435\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"
    ),
    thick_client_managed_application: make_keyword(
      "ThickClientManagedApplication|\u0422\u043E\u043B\u0441\u0442\u044B\u0439\u041A\u043B\u0438\u0435\u043D\u0442\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u043E\u0435\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"
    ),
    external_connection: make_keyword("ExternalConnection|\u0412\u043D\u0435\u0448\u043D\u0435\u0435\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435"),
    at_server_no_context: make_keyword("AtServerNoContext|\u041D\u0430\u0421\u0435\u0440\u0432\u0435\u0440\u0435\u0411\u0435\u0437\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430"),
    at_client_at_server_no_context: make_keyword(
      "AtClientAtServerNoContext|\u041D\u0430\u041A\u043B\u0438\u0435\u043D\u0442\u0435\u041D\u0430\u0421\u0435\u0440\u0432\u0435\u0440\u0435\u0411\u0435\u0437\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430"
    ),
    at_client_at_server: make_keyword("AtClientAtServer|\u041D\u0430\u041A\u043B\u0438\u0435\u043D\u0442\u0435\u041D\u0430\u0421\u0435\u0440\u0432\u0435\u0440\u0435"),
    before: make_keyword("Before|\u041F\u0435\u0440\u0435\u0434"),
    after: make_keyword("After|\u041F\u043E\u0441\u043B\u0435"),
    true: "True|\u0418\u0441\u0442\u0438\u043D\u0430",
    false: "False|\u041B\u043E\u0436\u044C",
    null: "NULL",
    undefined: "Undefined|\u041D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E"
  };
  var grammar_default = grammar({
    name: "bsl",
    externals: ($) => [$.multiline_char],
    extras: ($) => [$.comment, /\s/],
    precedences: ($) => [
      [
        "member",
        "call",
        "unary",
        "binary_times",
        "binary_plus",
        "binary_relation",
        "binary_equality",
        "logical_and",
        "logical_or",
        "ternary",
        "assign",
        "primary"
      ],
      ["assign", "primary"],
      // ['if', 'assign', $.primary_expression],
      ["member", "new", "call", $.expression]
    ],
    conflicts: ($) => [[$.function_declaration]],
    supertypes: ($) => [$.statement, $.expression, $.declaration, $.primary_expression],
    inline: ($) => [$.statement, $._lhs_expression],
    word: ($) => $.identifier,
    rules: {
      source_file: ($) => repeat($.statement),
      statement: ($) => choice(
        $.declaration,
        // $.statement_block,
        $.expression_statement,
        $.if_statement,
        $.for_statement,
        $.for_each_statement,
        $.while_statement,
        $.try_statement,
        $.break_statement,
        $.continue_statement,
        $.return_statement,
        $.raise_statement,
        // $.empty_statement,
        $.preproc_if,
        $.preproc_region
        //$.preproc_ins, // block level
        //$.preproc_del // block level
      ),
      declaration: ($) => choice($.variable_declaration, $.function_declaration),
      comment: ($) => token(seq("//", /.*/)),
      preproc_if: ($) => seq(
        preprocessor(make_keyword(keyword.if)),
        field("condition", $._preproc_expression),
        reservedWord(keyword.then, "then"),
        field("body", optional($._terminated_statement)),
        field("alternative", optional(choice($.preproc_else, $.preproc_elif))),
        preprocessor(make_keyword(keyword.end_if))
      ),
      preproc_elif: ($) => seq(
        preprocessor(make_keyword(keyword.elsif)),
        field("condition", $._preproc_expression),
        reservedWord(keyword.then, "then"),
        field("body", optional($._terminated_statement)),
        field("alternative", optional(choice($.preproc_else, $.preproc_elif)))
      ),
      preproc_else: ($) => seq(
        preprocessor(make_keyword(keyword.else)),
        field("body", optional($._terminated_statement))
      ),
      _preproc_expression: ($) => choice(
        $.preproc_identifier,
        alias($.preproc_binary_expression, $.binary_expression),
        alias($.preproc_unary_expression, $.unary_expression)
      ),
      preproc_unary_expression: ($) => prec.left(
        "unary",
        seq(
          field("operator", reservedWord(keyword.not, "not")),
          field("operand", $._preproc_expression)
        )
      ),
      preproc_binary_expression: ($) => choice(
        ...[
          [reservedWord(keyword.and, "and"), "logical_and"],
          [reservedWord(keyword.or, "or"), "logical_or"]
        ].map(
          ([operator, precedence]) => prec.left(
            precedence,
            seq(
              field("left", $._preproc_expression),
              field("operator", operator),
              field("right", $._preproc_expression)
            )
          )
        )
      ),
      preproc_identifier: ($) => choice(
        keyword.client,
        keyword.at_client,
        keyword.at_server,
        keyword.server,
        keyword.thin_client,
        keyword.web_client,
        keyword.mobile_standalone_server,
        keyword.mobile_app_client,
        keyword.mobile_app_server,
        keyword.mobile_client,
        keyword.thick_client_ordinary_application,
        keyword.thick_client_managed_application,
        keyword.external_connection
      ),
      preproc_region: ($) => seq(
        preprocessor(make_keyword(keyword.region)),
        field("name", $.identifier),
        repeat($.statement),
        preprocessor(make_keyword(keyword.end_region))
      ),
      directive: ($) => seq(
        "&",
        token.immediate(
          choice(
            keyword.at_client,
            keyword.at_server,
            keyword.at_server_no_context,
            keyword.at_client_at_server_no_context,
            keyword.at_client_at_server,
            keyword.before,
            keyword.after
          )
        ),
        optional(seq("(", $.string, ")"))
      ),
      // Main Grammar
      modifier: ($) => choice(
        reservedWord(keyword.async, "async"),
        reservedWord(keyword.export, "export"),
        reservedWord(keyword.val, "val")
      ),
      function_declaration: ($) => seq(
        optional($.directive),
        optional($.modifier),
        choice(
          reservedWord(keyword.function, "function"),
          reservedWord(keyword.procedure, "procedure")
        ),
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        optional($.modifier),
        field("body", optional($._terminated_statement)),
        choice(
          reservedWord(keyword.end_function, "end_function"),
          reservedWord(keyword.end_procedure, "end_procedure")
        )
      ),
      parameter_list: ($) => wrapped_in_parenthesis(commaSep($.parameter_declaration)),
      parameter_declaration: ($) => seq(
        optional($.modifier),
        field("parameter", $.identifier),
        optional(
          field(
            "default",
            seq(
              "=",
              choice(
                $.string,
                $.date,
                $.number,
                $.null,
                $.undefined,
                $.true,
                $.false
              )
              // replace
            )
          )
        )
      ),
      variable_declaration: ($) => seq(reservedWord(keyword.var, "var"), commaSep($.variable_declarator), $._semicolon),
      variable_declarator: ($) => seq(field("name", $.identifier), field("modifier", optional($.modifier))),
      expression: ($) => prec(
        5,
        choice(
          $.primary_expression,
          $.assignment_expression,
          $.await_expression,
          $.unary_expression,
          $.binary_expression,
          $.ternary_expression,
          $.new_expression
          // wrapped_in_parenthesis($.expression),
        )
      ),
      primary_expression: ($) => prec.left(
        "primary",
        choice(
          $.subscript_expression,
          $.member_expression,
          $.identifier,
          $.number,
          $.string,
          $.date,
          $.null,
          $.undefined,
          $.true,
          $.false,
          $.call_expression
        )
      ),
      expression_statement: ($) => seq($.expression, $._semicolon),
      binary_expression: ($) => choice(
        ...[
          [reservedWord(keyword.and, "and"), "logical_and"],
          [reservedWord(keyword.or, "or"), "logical_or"],
          ["+", "binary_plus"],
          ["-", "binary_plus"],
          ["*", "binary_times"],
          ["/", "binary_times"],
          ["%", "binary_times"],
          ["=", "binary_equality"],
          ["<>", "binary_equality"],
          ["<", "binary_relation"],
          ["<=", "binary_relation"],
          [">=", "binary_relation"],
          [">", "binary_relation"]
        ].map(
          ([operator, precedence]) => prec.left(
            precedence,
            seq(
              field("left", $.expression),
              field("operator", operator),
              field("right", $.expression)
            )
          )
        )
      ),
      ternary_expression: ($) => prec.left(
        "ternary",
        seq(
          "?",
          "(",
          field("condition", $.expression),
          ",",
          field("consequence", $.expression),
          ",",
          field("alternative", $.expression),
          ")"
        )
      ),
      assignment_expression: ($) => prec.left(
        "assign",
        seq(
          field("left", choice(wrapped_in_parenthesis($.expression), $._lhs_expression)),
          // field('left', $.identifier),
          "=",
          field("right", $.expression)
        )
      ),
      member_expression: ($) => prec.right(
        "member",
        seq(
          field("object", choice($.expression, $.primary_expression)),
          ".",
          field("property", $.identifier)
        )
      ),
      _lhs_expression: ($) => choice($.member_expression, $.subscript_expression, $.identifier),
      subscript_expression: ($) => prec.right(
        "member",
        seq(
          field("object", choice($.expression, $.primary_expression)),
          "[",
          field("index", $.expression),
          "]"
        )
      ),
      call_expression: ($) => choice(
        prec("call", seq(field("function", $.expression), field("arguments", $.arguments))),
        prec(
          "member",
          seq(field("function", $.primary_expression), field("arguments", $.arguments))
        )
      ),
      // empty_statement: (_) => prec.right(0, $._semicolon),
      new_expression: ($) => prec.right(
        "new",
        seq(
          reservedWord(keyword.new, "new"),
          choice(
            seq(
              field("constructor", $.identifier),
              field("arguments", optional(prec.dynamic(1, $.arguments)))
            ),
            field("arguments", optional(prec.dynamic(1, $.arguments)))
          )
        )
      ),
      unary_expression: ($) => prec.left(
        "unary",
        seq(
          field("operator", reservedWord(keyword.not, "not")),
          field("argument", $.expression)
        )
      ),
      await_expression: ($) => prec("unary", seq(reservedWord(keyword.await, "await"), $.expression)),
      number: ($) => token(/\d+(?:.\d+)*/),
      statement_block: ($) => prec.right(0, repeat1($.statement)),
      _terminated_statement: ($) => repeat1(seq($.statement, $._terminator)),
      _terminator: ($) => choice($._semicolon, /\n/),
      if_statement: ($) => prec.left(
        seq(
          reservedWord(keyword.if, "if"),
          optional_parenthesis(field("condition", $.expression)),
          reservedWord(keyword.then, "then"),
          field("consequence", optional($._terminated_statement)),
          field("alternative", optional(choice($.else_clause, $.elsif_clause))),
          reservedWord(keyword.end_if, "end_if"),
          optional($._semicolon)
        )
      ),
      _semicolon: ($) => ";",
      else_clause: ($) => seq(reservedWord(keyword.else, "else"), optional($._terminated_statement)),
      elsif_clause: ($) => seq(
        reservedWord(keyword.elsif, "elsif"),
        optional_parenthesis(field("condition", $.expression)),
        reservedWord(keyword.then, "then"),
        field("consequence", optional($._terminated_statement)),
        field("alternative", optional(choice($.else_clause, $.elsif_clause)))
      ),
      for_statement: ($) => prec.left(
        seq(
          reservedWord(keyword.for, "for"),
          field("counter", $.expression),
          reservedWord(keyword.to, "to"),
          field("limit", $.expression),
          reservedWord(keyword.do, "do"),
          field("block", optional($._terminated_statement)),
          reservedWord(keyword.end_do, "end_do"),
          optional($._semicolon)
        )
      ),
      for_each_statement: ($) => prec.left(
        seq(
          seq(reservedWord(keyword.for, "for"), reservedWord(keyword.each, "each")),
          field("object", $.expression),
          reservedWord(keyword.in, "in"),
          field("object", $.expression),
          reservedWord(keyword.do, "do"),
          field("block", optional($._terminated_statement)),
          reservedWord(keyword.end_do, "end_do"),
          optional($._semicolon)
        )
      ),
      while_statement: ($) => prec.left(
        seq(
          reservedWord(keyword.while, "while"),
          field("condition", $.expression),
          reservedWord(keyword.do, "do"),
          field("block", optional($._terminated_statement)),
          reservedWord(keyword.end_do, "end_do"),
          optional($._semicolon)
        )
      ),
      try_statement: ($) => prec.left(
        seq(
          reservedWord(keyword.try, "try"),
          field("body", optional($._terminated_statement)),
          reservedWord(keyword.except, "except"),
          field("handler", optional($._terminated_statement)),
          reservedWord(keyword.end_try, "end_try"),
          optional($._semicolon)
        )
      ),
      raise_statement: ($) => seq(reservedWord(keyword.raise, "raise"), optional($.string), $._semicolon),
      break_statement: ($) => seq(reservedWord(keyword.break, "break"), $._semicolon),
      continue_statement: ($) => seq(reservedWord(keyword.continue, "continue"), $._semicolon),
      return_statement: ($) => seq(reservedWord(keyword.return, "return"), optional($.expression), $._semicolon),
      string: ($) => choice($._string_literal, $._multiline_string_literal),
      _string_literal: ($) => prec(1, seq('"', repeat(choice($.string_fragment, $.escape_sequence)), '"')),
      _multiline_string_literal: ($) => prec(
        0,
        seq(
          '"',
          repeat(choice($.string_fragment, $.escape_sequence)),
          repeat1(
            seq($.multiline_char, repeat(choice($.string_fragment, $.escape_sequence)))
          ),
          '"'
        )
      ),
      // (?:(?:""|[^"\r\n])|[^"\r\n])+
      string_fragment: ($) => token.immediate(prec(1, /[^"\r\n]+/)),
      escape_sequence: (_) => token.immediate('""'),
      date: ($) => token(/'[\d\-T:/]+'/),
      identifier: ($) => {
        const alpha = /[^\x00-\x1F\s\p{Zs}0-9:;`"'@#.,|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/;
        const alphanumeric = /[^\x00-\x1F\s\p{Zs}:;`"'@#.,|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/;
        return token(seq(alpha, repeat(alphanumeric)));
      },
      arguments: ($) => seq("(", commaSep(choice($.expression)), ")"),
      null: (_) => reservedWord(keyword.null, "null"),
      undefined: (_) => reservedWord(keyword.undefined, "undefined"),
      true: (_) => reservedWord(keyword.true, "true"),
      false: (_) => reservedWord(keyword.false, "false")
    }
  });
  function optional_parenthesis(rule) {
    return prec.right(choice(rule, wrapped_in_parenthesis(rule)));
  }
  function wrapped_in_parenthesis(rule) {
    if (rule) {
      return seq("(", rule, ")");
    }
    return seq("(", ")");
  }
  function preprocessor(command) {
    return alias(
      new RegExp(`#[ 	]*${typeof command === "string" ? command : command.source}`),
      "#" + command
    );
  }
  function commaSep(rule) {
    return optional(commaSep1(rule));
  }
  function commaSep1(rule) {
    return seq(rule, repeat(seq(",", rule)));
  }
  function make_keyword(words) {
    return new RegExp(`(${caseInsensitive(words)})`);
  }
  function caseInsensitive(words) {
    return words.split("|").map(
      (word) => word.split("").map((char) => `[${char.toUpperCase()}${char.toLowerCase()}]`).join("")
    ).join("|");
  }
  function reservedWord(word, wordAlias) {
    return alias(reserved(caseInsensitive(word)), wordAlias);
  }
  function reserved(regexString) {
    return token(prec(2, new RegExp(regexString)));
  }
  return __toCommonJS(grammar_exports);
})();
module.exports = parser.default
