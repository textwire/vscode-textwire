# Changelog

## [1.2.2] - 2024-03-25

- Fixed highlighting for Textwire directives inside HTML tags. For example, `<span @if(true)nice@end></span>`. It used to ignore highlighting for `@end` directive

## [1.2.1] - 2024-03-23

- Fixed highlighting dots array brackets, object brackets and other elements inside HTML attributes. They used to be highlighted as strings. For example `<input type="{{ obj.prop }}">`

## [1.2.0] - 2024-03-21

- Added syntax highlighting for Textwire comments. For example, `{{-- This is a comment --}}`
- Added syntax highlighting for Textwire code inside HTML tags. For example, `<div {{ attr.raw() }}></div>`

## [1.1.0] - 2024-03-19

- Fix highlighting with directives and comments that touch html. For example, `@end<div>` or `@endHere is HTML`
- Remove highlighting for escaped directories. For example, `\@if()`, `\@else` or `\@end`
- Added highlighting for blade directives inside HTML attributes. For example `<input type="@if(var)text@end">`
- Added highlighting for Textwire expressions inside HTML attributes. For example `<input type="{{ inpType }}">`
- Added highlighting for dots in Textwire expressions. For example `{{ obj.prop }}`
- Added auto-closing curly braces `{{`

## [1.0.1] - 2024-03-19

- Fixed error in `package.json` file related to not having `contributes.languages.id` field

## [1.0.0] - 2024-03-18

- Added syntax highlighting for Textwire code
- Added custom Textwire icon for Textwire files
- Filled out README.md with more information