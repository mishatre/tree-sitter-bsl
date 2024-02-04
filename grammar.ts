import type { Rule } from './global';

const keyword = {
    region: 'Region|Область',
    end_region: 'EndRegion|КонецОбласти',
    var: 'Var|Перем',
    export: 'Export|Экспорт',
    val: 'Val|Знач',
    new: 'New|Новый',
    not: 'Not|Не',
    or: 'Or|Или',
    and: 'And|И',
    then: 'Then|Тогда',
    if: 'If|Если',
    elsif: 'ElsIf|ИначеЕсли',
    else: 'Else|Иначе',
    end_if: 'EndIf|КонецЕсли',
    while: 'While|Пока',
    for: 'For|Для',
    each: 'Each|Каждого',
    in: 'In|Из',
    to: 'To|По',
    do: 'Do|Цикл',
    continue: 'Continue|Продолжить',
    break: 'Break|Прервать',
    end_do: 'EndDo|КонецЦикла',
    function: 'Function|Функция',
    end_function: 'EndFunction|КонецФункции',
    procedure: 'Procedure|Процедура',
    end_procedure: 'EndProcedure|КонецПроцедуры',
    return: 'Return|Возврат',
    try: 'Try|Попытка',
    except: 'Except|Исключение',
    end_try: 'EndTry|КонецПопытки',
    raise: 'Raise|ВызватьИсключение',
    async: 'Async|Асинх',
    await: 'Await|Ждать',
    client: make_keyword('Client|Клиент'),
    at_client: make_keyword('AtClient|НаКлиенте'),
    at_server: make_keyword('AtServer|НаСервере'),
    server: make_keyword('Server|Сервер'),
    thin_client: make_keyword('ThinClient|ТонкийКлиент'),
    web_client: make_keyword('WebClient|ВебКлиент'),
    mobile_standalone_server: make_keyword('MobileStandaloneServer|МобильныйАвтономныйСервер'),
    mobile_app_client: make_keyword('MobileAppClient|МобильноеПриложениеКлиент'),
    mobile_app_server: make_keyword('MobileAppServer|МобильноеПриложениеСервер'),
    mobile_client: make_keyword('MobileClient|МобильныйКлиент'),
    thick_client_ordinary_application: make_keyword(
        'ThickClientOrdinaryApplication|ТолстыйКлиентОбычноеПриложение',
    ),
    thick_client_managed_application: make_keyword(
        'ThickClientManagedApplication|ТолстыйКлиентУправляемоеПриложение',
    ),
    external_connection: make_keyword('ExternalConnection|ВнешнееСоединение'),
    at_server_no_context: make_keyword('AtServerNoContext|НаСервереБезКонтекста'),
    at_client_at_server_no_context: make_keyword(
        'AtClientAtServerNoContext|НаКлиентеНаСервереБезКонтекста',
    ),
    at_client_at_server: make_keyword('AtClientAtServer|НаКлиентеНаСервере'),

    before: make_keyword('Before|Перед'),
    after: make_keyword('After|После'),

    true: 'True|Истина',
    false: 'False|Ложь',
    null: 'NULL',
    undefined: 'Undefined|Неопределено',
};

export default grammar({
    name: 'bsl',

    externals: ($) => [$.multiline_char],

    extras: ($) => [$.comment, /\s/],

    precedences: ($) => [
        [
            'member',
            'call',
            'unary',
            'binary_times',
            'binary_plus',
            'binary_relation',
            'binary_equality',
            'logical_and',
            'logical_or',
            'ternary',
            'assign',
            'primary',
        ],
        ['assign', 'primary'],
        // ['if', 'assign', $.primary_expression],
        ['member', 'new', 'call', $.expression],
    ],

    conflicts: ($) => [[$.function_declaration]],

    supertypes: ($) => [$.statement, $.expression, $.declaration, $.primary_expression],

    inline: ($) => [$.statement, $._lhs_expression],

    word: ($) => $.identifier,

    rules: {
        source_file: ($) => repeat($.statement),

        statement: ($) =>
            choice(
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
                $.preproc_region,
                //$.preproc_ins, // block level
                //$.preproc_del // block level
            ),

        declaration: ($) => choice($.variable_declaration, $.function_declaration),

        comment: ($) => token(seq('//', /.*/)),

        preproc_if: ($) =>
            seq(
                preprocessor(make_keyword(keyword.if)),
                field('condition', $._preproc_expression),
                reservedWord(keyword.then, 'then'),
                field('body', optional($._terminated_statement)),
                field('alternative', optional(choice($.preproc_else, $.preproc_elif))),
                preprocessor(make_keyword(keyword.end_if)),
            ),

        preproc_elif: ($) =>
            seq(
                preprocessor(make_keyword(keyword.elsif)),
                field('condition', $._preproc_expression),
                reservedWord(keyword.then, 'then'),
                field('body', optional($._terminated_statement)),
                field('alternative', optional(choice($.preproc_else, $.preproc_elif))),
            ),

        preproc_else: ($) =>
            seq(
                preprocessor(make_keyword(keyword.else)),
                field('body', optional($._terminated_statement)),
            ),

        _preproc_expression: ($) =>
            choice(
                $.preproc_identifier,
                alias($.preproc_binary_expression, $.binary_expression),
                alias($.preproc_unary_expression, $.unary_expression),
            ),

        preproc_unary_expression: ($) =>
            prec.left(
                'unary',
                seq(
                    field('operator', reservedWord(keyword.not, 'not')),
                    field('operand', $._preproc_expression),
                ),
            ),

        preproc_binary_expression: ($) =>
            choice(
                ...(
                    [
                        [reservedWord(keyword.and, 'and'), 'logical_and'],
                        [reservedWord(keyword.or, 'or'), 'logical_or'],
                    ] as const
                ).map(([operator, precedence]) =>
                    prec.left(
                        precedence,
                        seq(
                            field('left', $._preproc_expression),
                            field('operator', operator),
                            field('right', $._preproc_expression),
                        ),
                    ),
                ),
            ),

        preproc_identifier: ($) =>
            choice(
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
                keyword.external_connection,
            ),

        preproc_region: ($) =>
            seq(
                preprocessor(make_keyword(keyword.region)),
                field('name', $.identifier),
                repeat($.statement),
                preprocessor(make_keyword(keyword.end_region)),
            ),

        directive: ($) =>
            seq(
                '&',
                token.immediate(
                    choice(
                        keyword.at_client,
                        keyword.at_server,
                        keyword.at_server_no_context,
                        keyword.at_client_at_server_no_context,
                        keyword.at_client_at_server,
                        keyword.before,
                        keyword.after,
                    ),
                ),
                optional(seq('(', $.string, ')')),
            ),

        // Main Grammar

        modifier: ($) =>
            choice(
                reservedWord(keyword.async, 'async'),
                reservedWord(keyword.export, 'export'),
                reservedWord(keyword.val, 'val'),
            ),

        function_declaration: ($) =>
            seq(
                optional($.directive),
                optional($.modifier),
                choice(
                    reservedWord(keyword.function, 'function'),
                    reservedWord(keyword.procedure, 'procedure'),
                ),
                field('name', $.identifier),
                field('parameters', $.parameter_list),
                optional($.modifier),
                field('body', optional($._terminated_statement)),
                choice(
                    reservedWord(keyword.end_function, 'end_function'),
                    reservedWord(keyword.end_procedure, 'end_procedure'),
                ),
            ),

        parameter_list: ($) => wrapped_in_parenthesis(commaSep($.parameter_declaration)),

        parameter_declaration: ($) =>
            seq(
                optional($.modifier),
                field('parameter', $.identifier),
                optional(
                    field(
                        'default',
                        seq(
                            '=',
                            choice(
                                $.string,
                                $.date,
                                $.number,
                                $.null,
                                $.undefined,
                                $.true,
                                $.false,
                            ), // replace
                        ),
                    ),
                ),
            ),

        variable_declaration: ($) =>
            seq(reservedWord(keyword.var, 'var'), commaSep($.variable_declarator), $._semicolon),

        variable_declarator: ($) =>
            seq(field('name', $.identifier), field('modifier', optional($.modifier))),

        expression: ($) =>
            prec(
                5,
                choice(
                    $.primary_expression,
                    $.assignment_expression,
                    $.await_expression,
                    $.unary_expression,
                    $.binary_expression,
                    $.ternary_expression,
                    $.new_expression,
                    // wrapped_in_parenthesis($.expression),
                ),
            ),

        primary_expression: ($) =>
            prec.left(
                'primary',
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
                    $.call_expression,
                ),
            ),

        expression_statement: ($) => seq($.expression, $._semicolon),

        binary_expression: ($) =>
            choice(
                ...(
                    [
                        [reservedWord(keyword.and, 'and'), 'logical_and'],
                        [reservedWord(keyword.or, 'or'), 'logical_or'],
                        ['+', 'binary_plus'],
                        ['-', 'binary_plus'],
                        ['*', 'binary_times'],
                        ['/', 'binary_times'],
                        ['%', 'binary_times'],
                        ['=', 'binary_equality'],
                        ['<>', 'binary_equality'],
                        ['<', 'binary_relation'],
                        ['<=', 'binary_relation'],
                        ['>=', 'binary_relation'],
                        ['>', 'binary_relation'],
                    ] as const
                ).map(([operator, precedence]) =>
                    prec.left(
                        precedence,
                        seq(
                            field('left', $.expression),
                            field('operator', operator),
                            field('right', $.expression),
                        ),
                    ),
                ),
            ),

        ternary_expression: ($) =>
            prec.left(
                'ternary',
                seq(
                    '?',
                    '(',
                    field('condition', $.expression),
                    ',',
                    field('consequence', $.expression),
                    ',',
                    field('alternative', $.expression),
                    ')',
                ),
            ),

        assignment_expression: ($) =>
            prec.left(
                'assign',
                seq(
                    field('left', choice(wrapped_in_parenthesis($.expression), $._lhs_expression)),
                    // field('left', $.identifier),
                    '=',
                    field('right', $.expression),
                ),
            ),

        member_expression: ($) =>
            prec.right(
                'member',
                seq(
                    field('object', choice($.expression, $.primary_expression)),
                    '.',
                    field('property', $.identifier),
                ),
            ),

        _lhs_expression: ($) => choice($.member_expression, $.subscript_expression, $.identifier),

        subscript_expression: ($) =>
            prec.right(
                'member',
                seq(
                    field('object', choice($.expression, $.primary_expression)),
                    '[',
                    field('index', $.expression),
                    ']',
                ),
            ),

        call_expression: ($) =>
            choice(
                prec('call', seq(field('function', $.expression), field('arguments', $.arguments))),
                prec(
                    'member',
                    seq(field('function', $.primary_expression), field('arguments', $.arguments)),
                ),
            ),

        // empty_statement: (_) => prec.right(0, $._semicolon),

        new_expression: ($) =>
            prec.right(
                'new',
                seq(
                    reservedWord(keyword.new, 'new'),
                    choice(
                        seq(
                            field('constructor', $.identifier),
                            field('arguments', optional(prec.dynamic(1, $.arguments))),
                        ),
                        field('arguments', optional(prec.dynamic(1, $.arguments))),
                    ),
                ),
            ),

        unary_expression: ($) =>
            prec.left(
                'unary',
                seq(
                    field('operator', reservedWord(keyword.not, 'not')),
                    field('argument', $.expression),
                ),
            ),

        await_expression: ($) =>
            prec('unary', seq(reservedWord(keyword.await, 'await'), $.expression)),

        number: ($) => token(/\d+(?:.\d+)*/),

        statement_block: ($) => prec.right(0, repeat1($.statement)),
        _terminated_statement: ($) => repeat1(seq($.statement, $._terminator)),
        _terminator: ($) => choice($._semicolon, /\n/),

        if_statement: ($) =>
            prec.left(
                seq(
                    reservedWord(keyword.if, 'if'),
                    optional_parenthesis(field('condition', $.expression)),
                    reservedWord(keyword.then, 'then'),
                    field('consequence', optional($._terminated_statement)),
                    field('alternative', optional(choice($.else_clause, $.elsif_clause))),
                    reservedWord(keyword.end_if, 'end_if'),
                    optional($._semicolon),
                ),
            ),

        _semicolon: ($) => ';',

        else_clause: ($) =>
            seq(reservedWord(keyword.else, 'else'), optional($._terminated_statement)),

        elsif_clause: ($) =>
            seq(
                reservedWord(keyword.elsif, 'elsif'),
                optional_parenthesis(field('condition', $.expression)),
                reservedWord(keyword.then, 'then'),
                field('consequence', optional($._terminated_statement)),
                field('alternative', optional(choice($.else_clause, $.elsif_clause))),
            ),

        for_statement: ($) =>
            prec.left(
                seq(
                    reservedWord(keyword.for, 'for'),
                    field('counter', $.expression),
                    reservedWord(keyword.to, 'to'),
                    field('limit', $.expression),
                    reservedWord(keyword.do, 'do'),
                    field('block', optional($._terminated_statement)),
                    reservedWord(keyword.end_do, 'end_do'),
                    optional($._semicolon),
                ),
            ),

        for_each_statement: ($) =>
            prec.left(
                seq(
                    seq(reservedWord(keyword.for, 'for'), reservedWord(keyword.each, 'each')),
                    field('object', $.expression),
                    reservedWord(keyword.in, 'in'),
                    field('object', $.expression),
                    reservedWord(keyword.do, 'do'),
                    field('block', optional($._terminated_statement)),
                    reservedWord(keyword.end_do, 'end_do'),
                    optional($._semicolon),
                ),
            ),
        while_statement: ($) =>
            prec.left(
                seq(
                    reservedWord(keyword.while, 'while'),
                    field('condition', $.expression),
                    reservedWord(keyword.do, 'do'),
                    field('block', optional($._terminated_statement)),
                    reservedWord(keyword.end_do, 'end_do'),
                    optional($._semicolon),
                ),
            ),

        try_statement: ($) =>
            prec.left(
                seq(
                    reservedWord(keyword.try, 'try'),
                    field('body', optional($._terminated_statement)),
                    reservedWord(keyword.except, 'except'),
                    field('handler', optional($._terminated_statement)),
                    reservedWord(keyword.end_try, 'end_try'),
                    optional($._semicolon),
                ),
            ),

        raise_statement: ($) =>
            seq(reservedWord(keyword.raise, 'raise'), optional($.string), $._semicolon),
        break_statement: ($) => seq(reservedWord(keyword.break, 'break'), $._semicolon),
        continue_statement: ($) => seq(reservedWord(keyword.continue, 'continue'), $._semicolon),
        return_statement: ($) =>
            seq(reservedWord(keyword.return, 'return'), optional($.expression), $._semicolon),

        string: ($) => choice($._string_literal, $._multiline_string_literal),
        _string_literal: ($) =>
            prec(1, seq('"', repeat(choice($.string_fragment, $.escape_sequence)), '"')),
        _multiline_string_literal: ($) =>
            prec(
                0,
                seq(
                    '"',
                    repeat(choice($.string_fragment, $.escape_sequence)),
                    repeat1(
                        seq($.multiline_char, repeat(choice($.string_fragment, $.escape_sequence))),
                    ),
                    '"',
                ),
            ),

        // (?:(?:""|[^"\r\n])|[^"\r\n])+
        string_fragment: ($) => token.immediate(prec(1, /[^"\r\n]+/)),
        escape_sequence: (_) => token.immediate('""'),

        date: ($) => token(/'[\d\-T:/]+'/),

        identifier: ($) => {
            const alpha =
                /[^\x00-\x1F\s\p{Zs}0-9:;`"'@#.,|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/;
            const alphanumeric =
                /[^\x00-\x1F\s\p{Zs}:;`"'@#.,|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/;
            return token(seq(alpha, repeat(alphanumeric)));
        },

        arguments: ($) => seq('(', commaSep(choice($.expression)), ')'),

        null: (_) => reservedWord(keyword.null, 'null'),
        undefined: (_) => reservedWord(keyword.undefined, 'undefined'),
        true: (_) => reservedWord(keyword.true, 'true'),
        false: (_) => reservedWord(keyword.false, 'false'),
    },
});

function optional_parenthesis<K extends string>(rule: Rule<K>) {
    return prec.right(choice<K>(rule, wrapped_in_parenthesis<K>(rule)));
}

function wrapped_in_parenthesis<K extends string>(rule?: Rule<K>) {
    if (rule) {
        return seq<K>('(', rule, ')');
    }
    return seq<K>('(', ')');
}

/**
 * Creates a preprocessor regex rule
 *
 * @param {RegExp|Rule|String} command
 *
 * @return {AliasRule}
 */
function preprocessor<K extends string>(command: string | RegExp) {
    return alias<K>(
        new RegExp(`#[ \t]*${typeof command === 'string' ? command : command.source}`),
        '#' + command,
    );
}

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @return {ChoiceRule}
 *
 */
function commaSep<K extends string>(rule: Rule<K>) {
    return optional(commaSep1(rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @return {SeqRule}
 *
 */
function commaSep1<K extends string>(rule: Rule<K>) {
    return seq(rule, repeat(seq(',', rule)));
}

/**
 * Make words case insensitive. Words separated by "|" are treated as alternatives
 */
function make_keyword(words: string) {
    return new RegExp(`(${caseInsensitive(words)})`);
}
function caseInsensitive(words: string) {
    return words
        .split('|')
        .map((word) =>
            word
                .split('')
                .map((char) => `[${char.toUpperCase()}${char.toLowerCase()}]`)
                .join(''),
        )
        .join('|');
}

function reservedWord<K extends string>(word: string, wordAlias: string | Rule<K>) {
    return alias<K>(reserved<K>(caseInsensitive(word)), wordAlias);
}

function reserved<K extends string>(regexString: string) {
    return token<K>(prec(2, new RegExp(regexString)));
}
