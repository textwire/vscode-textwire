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

const insert = `insert($1)
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

export default {
    if: _if,
    ifElse,
    ifElseif,
    each,
    eachElse,
    compSlot,
    slot,
    slotDef,
    insert,
    dump: 'dump($1)',
    use: 'use($1)',
    insertEnd: 'insert($1)',
    reserve: 'reserve($1)',
    comp: 'component($1)',
    end: 'end',
}
