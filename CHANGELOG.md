# Changelog

## [1.0.2] - 2024-03-19

- Fix highlighting with directives and comments that touch html. For example, `@end<div>` or `@endHere is HTML`
- Remove highlighting for escaped directories. For example, `\@if()`, `\@else` or `\@endif`

## [1.0.1] - 2024-03-19

- Fixed error in `package.json` file related to not having `contributes.languages.id` field

## [1.0.0] - 2024-03-18

- Added syntax highlighting for Textwire code
- Added custom Textwire icon for Textwire files
- Filled out README.md with more information