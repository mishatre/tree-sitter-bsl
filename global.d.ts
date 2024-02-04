// Augmentations for the global scope can only be directly nested
// in external modules or ambient module declarations.
export {};

export type Rule<K extends string, Key extends string = ''> =
    | (($: { [key in K]: Rule<K> }) => Rule<K>)
    | string
    | RegExp;

export type SeqRule<K extends string = ''> = Rule<K>;

interface GrammarDefinition<
    K extends Keys & ExternalKeys,
    Keys extends string,
    ExternalKeys extends string,
    P extends string,
> {
    name: string;
    rules: {
        [key in K]: Rule<K, key>;
    };
    // An array of tokens that may appear anywhere in the language. This is often used for whitespace and comments. The default value of extras is to accept whitespace. To control whitespace explicitly, specify extras: $ => [] in your grammar.
    extras?: ($: {
        [key in K]: Rule<K>;
    }) => (Rule<K> | string | RegExp)[];
    // An array of rule names that should be automatically removed from the grammar by replacing all of their usages with a copy of their definition. This is useful for rules that are used in multiple places but for which you don’t want to create syntax tree nodes at runtime.
    inline?: ($: {
        [key in K]: Rule<K>;
    }) => Rule<K>[];
    // An array of arrays of rule names. Each inner array represents a set of rules that’s involved in an LR(1) conflict that is intended to exist in the grammar. When these conflicts occur at runtime, Tree-sitter will use the GLR algorithm to explore all of the possible interpretations. If multiple parses end up succeeding, Tree-sitter will pick the subtree whose corresponding rule has the highest total dynamic precedence.
    conflicts?: ($: {
        [key in K]: Rule<K>;
    }) => Rule<K>[][];
    // An array of token names which can be returned by an external scanner. External scanners allow you to write custom C code which runs during the lexing process in order to handle lexical rules (e.g. Python’s indentation tokens) that cannot be described by regular expressions.
    externals?: ($: {
        [key in K]: Rule<K>;
    }) => Rule<ExternalKeys>[];
    // An array of array of strings, where each array of strings defines named precedence levels in descending order. These names can be used in the prec functions to define precedence relative only to other names in the array, rather than globally. Can only be used with parse precedence, not lexical precedence.
    precedences?: ($: {
        [key in K]: Rule<K>;
    }) => (Rule<K> | P)[][];
    // The name of a token that will match keywords for the purpose of the keyword extraction optimization.
    word?: ($: {
        [key in K]: Rule<K>;
    }) => Rule<K>;
    // An array of hidden rule names which should be considered to be ‘supertypes’ in the generated node types file.
    supertypes?: ($: {
        [key in K]: Rule<K>;
    }) => Rule<K>[];
}

declare global {
    function grammar<
        K extends Keys & ExternalKeys,
        Keys extends string,
        ExternalKeys extends string,
        P extends string,
    >(definition: GrammarDefinition<K, Keys, ExternalKeys, P>): void;
    // Sequences
    function seq<K extends string>(...rules: Rule<K>[]): SeqRule<K>;
    // Alternatives
    function choice<K extends string>(...rules: Rule<K>[]): Rule<K>;
    // Repetitions
    function repeat<K extends string>(rule: Rule<K>): Rule<K>;
    // Repetitions
    function repeat1<K extends string>(rule: Rule<K>): Rule<K>;
    // Options
    function optional<K extends string>(rule: Rule<K>): Rule<K>;
    // Precedence
    const prec: (<K extends string, P extends string>(
        number: number | P,
        rule: Rule<K>,
    ) => Rule<K>) & {
        // Left Associativity
        left: <K extends string>(number: number | string | Rule<K>, rule?: Rule<K>) => Rule<K>;
        // Right Associativity
        right: <K extends string>(number: number | string | Rule<K>, rule?: Rule<K>) => Rule<K>;
        // Dynamic Precedence
        dynamic: <K extends string>(number: number | string, rule: Rule<K>) => Rule<K>;
    };
    // Tokens
    //
    // This function marks the given rule as producing only a single token. Tree-sitter’s default is to treat each String or RegExp literal in the grammar as a separate token. Each token is matched separately by the lexer and returned as its own leaf node in the tree. The token function allows you to express a complex rule using the functions described above (rather than as a single regular expression) but still have Tree-sitter treat it as a single token.
    const token: (<K extends string>(rule: Rule<K>) => Rule<K>) & {
        immediate: <K extends string>(rule: Rule<K>) => Rule<K>;
    }; // Usually, whitespace (and any other extras, such as comments) is optional before each token. This function means that the token will only match if there is no whitespace.
    // Aliases
    //
    // This function causes the given rule to appear with an alternative name in the syntax tree. If name is a symbol, as in alias($.foo, $.bar), then the aliased rule will appear as a named node called bar. And if name is a string literal, as in alias($.foo, 'bar'), then the aliased rule will appear as an anonymous node, as if the rule had been written as the simple string.
    function alias<K extends string>(rule: Rule<K>, name: string | Rule<K>): Rule<K>;
    // Field Names
    //
    // This function assigns a field name to the child node(s) matched by the given rule. In the resulting syntax tree, you can then use that field name to access specific children.
    function field<K extends string>(name: string, rule: Rule<K>): Rule<K>;
}
