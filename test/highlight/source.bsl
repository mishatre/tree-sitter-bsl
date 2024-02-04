#Область ИмяОбласти
// <- keyword.other.section
// ^ keyword.other.section
//       ^ entity.name.section

Перем А Экспорт;
// <- storage.type.var
//    ^ variable
//      ^ storage.modifier

Перем А, Б;
//     ^ keyword.operator
//       ^ variable

Перем А Экспорт, Б;
//    ^ variable
//       ^ storage.modifier
//             ^ keyword.operator
//               ^ variable

Перем А, Б Экспорт;
//    ^ variable
//     ^ keyword.operator
//       ^ variable
//         ^ storage.modifier

Перем А Экспорт, Б Экспорт;
//    ^ variable
//       ^ storage.modifier
//             ^ keyword.operator
//               ^ variable
//                 ^ storage.modifier

#Если Сервер Тогда
// <- keyword.other.preprocessor
//    ^^^^^^ keyword.other.preprocessor

&НаСервере
// <- storage.modifier.directive
// ^ storage.modifier.directive
Процедура ИмяПроцедуры(
// <- storage.type
//        ^ entity.name.function
//                    ^ punctuation.bracket.begin
    Знач ПараметрСКонстантой,
//  ^ storage.modifier
//       ^ variable.parameter
//                          ^ keyword.operator
    ОбычныйПараметр,
//  ^ variable.parameter

    ПараметрСДефолтнымЧисловымЗначением = 0) Экспорт
//                                      ^ keyword.operator.assignment
//                                        ^ constant.numeric
//                                         ^ punctuation.bracket.end
//                                           ^ storage.modifier
    Б = "текст с экраннированной "" кавычкой" + "и конкатенаций""";
//       ^ string.quoted.double
//                               ^^ constant.character.escape
//                                 ^ not:constant.character.escape
//                                              ^ string.quoted.double
//                                                             ^^ constant.character.escape
//                                                               ^ not:constant.character.escape
//                                                                ^ keyword.operator

    В = "многострочная
//      ^ string.quoted.double
    |строка
//  ^ string.quoted.double
    //|this is comment
//      ^ comment.line.double-slash
    |// and this is not
//      ^ string.quoted.double
    |";
//   ^ string.quoted.double
//    ^ keyword.operator

    Г = "";
//      ^^ string.quoted.double

    ТекстЗапроса =
    "ВЫБРАТЬ
//  ^^ string.quoted.double
//   ^ keyword.control.sdbl
    |	Таблица.Поле КАК Поле,
    |	МАКСИМУМ(Таблица.Поле2) КАК Поле2
    |ИЗ
    |	Таблица КАК Таблица
    |ГДЕ
    |	Таблица.Поле = 0
    |	И Таблица.Поле <> ""Строка""
    |	И ВЫРАЗИТЬ(Таблица.Поле КАК СТРОКА) <> """"
    |	И Таблица.Поле <> ""Строка с экраннированной """" кавычкой""
    //|Commented string
//  ^ string.quoted.double comment.line.double-slash
    |// Commented string inside query with double quotes ""TEXT""
//  ^ string.quoted.double
//  ^ not:comment.line.double-slash.sdbl
//   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ comment.line.double-slash.sdbl
    |СГРУППИРОВАТЬ ПО
    |	Поле
    //|//АВТОУПОРЯДОЧИВАНИЕ";
//  ^^^^^^^^^^^^^^^^^^^^^^^^^ comment.line.double-slash
    |//АВТОУПОРЯДОЧИВАНИЕ";
//  ^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double
//  ^ not:comment.line.double-slash.sdbl
//   ^^^^^^^^^^^^^^^^^^^^ comment.line.double-slash.sdbl
//                       ^ not:comment.line.double-slash.sdbl
//                        ^ keyword.operator

    // Checking the correctness of processing FirstLineMatch and #include: source.sdbl
    СтрокаСоСловомВыбрать = "Some selected text";
//                                ^^^^^^ not:keyword.control.sdbl

    Число = 0.0 * 100;
//  ^ not:support.function
//          ^^^ constant.numeric
//              ^ keyword.operator.arithmetic

    Дата = '00010101000000';
//         ^^^^^^^^^^^^^^^^ constant.other.date
    КороткаяДата = '00010101';
//                 ^^^^^^^^^^ constant.other.date
    ДатаСРазделителями = '0001-01-01T00:00:00';
//                       ^^^^^^^^^^^^^^^^^^^^^ constant.other.date
    КороткаяДатаСРазделителями = '0001/01/01';
//                               ^^^^^^^^^^^^ constant.other.date
    СтрокаСДатойВнутри = "Литерал типа Дата: '00010101'";
//                                          ^^^^^^^^^^^^ string.quoted.double
//                                           ^^^^^^^^^^ not:constant.other.date

    Если А = 0 И НЕ Число <= 0 Тогда
//  ^ keyword.control.conditional
//         ^ keyword.operator.comparison
//           ^ constant.numeric
//             ^ keyword.operator.logical
//               ^^ keyword.operator.logical
//                        ^^ keyword.operator.comparison
//                             ^ keyword.control.conditional

        ОбычныйПараметр = Истина;
//                        ^ constant.language
    Иначе
//  ^ keyword.control.conditional
        ОбычныйПараметр = Ложь
    КонецЕсли;
//  ^ keyword.control.conditional

    Пока ЗначениеЗаполнено(Б) Цикл
//  ^ keyword.control.repeat
//       ^ support.function
//                        ^ punctuation.bracket.begin
//                         ^ not:punctuation.bracket.begin
//                          ^ punctuation.bracket.end
        Прервать;
//      ^ keyword.control
    КонецЦикла;
//  ^ keyword.control.repeat

    НевстроеннаяПроцедура();
//  ^ not:support.function

    НовыйОбъект = Новый ТаблицаЗначений;
//                ^^^^^ support.function
//                     ^ not:support.function
    НовыйОбъектСкобка = Новый("ТаблицаЗначений");
//                      ^^^^^ support.function
//                           ^ not:support.function

    ПрефиксЗначениеЗаполненоПостфикс = "";
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ not:support.function

    // Checking for correct processing of the beginning and end of a word
    Объект.Сообщить().Если().Цикл().Новый;
//         ^^^^^^^^                 ^^^^^ not:support.function
//                    ^^^^ not:keyword.control.conditional
//                           ^^^^ not:keyword.control.repeat

    // Checking the highlighting of global properties with a dot
    Справочники.ИмяСправочника.СоздатьЭлемент();
//  ^ support.class
    А = ХранилищеПользовательскихНастроекДинамическихСписков.Сохранить();
//      ^ support.variable

    А = 0;
//  ^ variable.assignment
//    ^ keyword.operator.assignment

    Б = А = 0;
//  ^ variable.assignment
//    ^ keyword.operator.assignment
//        ^ keyword.operator.comparison

    Если А = Б Тогда
//       ^ not:variable.assignment
//         ^ keyword.operator.comparison
    ИначеЕсли ЗначениеЗаполнено(А) = ЗначениеЗаполнено(Б) Тогда
//            ^ not:variable.assignment
//                                 ^ keyword.operator.comparison
    КонецЕсли;

    // TODO:
//     ^^^^	storage.type.class.todo

    Если А И
//       ^ not:variable.assignment
        Б = В Тогда
//      ^ not:variable.assignment       
        Б = 0;
//      ^ variable.assignment
    КонецЕсли;

КонецПроцедуры
// <- storage.type

Процедура НевстроеннаяПроцедура()
    Возврат;
//  ^ keyword.control
КонецПроцедуры

&Перед("ПередЗаписью")
// <- storage.type.annotation
// ^^^ storage.type.annotation
//     ^^^^^^^^^^^^^^ string.quoted.double
Процедура Расш1_ПередЗаписью()

КонецПроцедуры

#КонецЕсли
// <- keyword.other.preprocessor
// ^ keyword.other.preprocessor

#КонецОбласти
// <- keyword.other.section
// ^ keyword.other.section