import Benchmark from 'benchmark'
import { ulid } from 'ulid'
import uucid from '../index'

const suite = new Benchmark.Suite()

test('Generate ID from current date', () => {
  suite
    .add('UUCID', function() {
      uucid()
    })
    .add('ULID', function() {
      ulid()
    })
    .on('cycle', function(event: any) {
      console.log(String(event.target))
    })
    .on('complete', function(this: { filter: any }) {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    // run async
    .run({ async: false })
})
