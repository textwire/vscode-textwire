const _if = `if($1)
    $2
@end`

const ifElse = `if($1)
    $2
@else
    $3
@end`

const each = `each($1 in $2)
    $3
@end`

const eachElse = `each($1 in $2)
    $3
@else
    $4
@end`

const _for = `for(i = 0; i < $1; i++)
    $3
@end`

const forElse = `for(i = 0; i < $1; i++)
    $3
@else
    $4
@end`

const insertEnd = `insert($1)
    $2
@end`

const compSlot = `component($1)
    @slot
        $2
    @end
@end`

const slot = `slot($1)
    $1
@end`

const slotDef = `slot
    $2
@end`

const ifElseif = `if($1)
    $2
@elseif($2)
    $3
@end`

export const directivesSnippets = {
    if: _if,
    ifElse,
    ifElseif,
    each,
    eachElse,
    for: _for,
    forElse,
    compSlot,
    slot,
    slotDef,
    insert: 'insert($1, $2)',
    insertEnd,
    dump: 'dump($1)',
    use: 'use($1)',
    reserve: 'reserve($1)',
    comp: 'component($1)',
    end: 'end',
    break: 'break',
    continue: 'continue',
    breakIf: 'breakIf($1)',
    continueIf: 'continueIf($1)',
}
