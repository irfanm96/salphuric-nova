<?php

namespace Tests\Unit;

use drupol\phpermutations\Generators\Permutations;
use drupol\phpermutations\Iterators\Combinations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    protected $output = array();


    /** @test * */
    public function test_combination()
    {

        $RB = ['RB1', 'RB2', 'RB3', 'RB4'];
        $r = 2;

        // Create the object


        $permutations = new Combinations($RB, 3);

        print_r($permutations->toArray());


//        // Use a foreach loop.
//        foreach ($permutations as $permutation) {// do stuff}
//
//            // Or get the whole array at once.
//            print_r($permutations->toArray());
//
//        }
        $this->assertTrue(true);


    }

    public
    function testBasicTest()
    {

        // Driver Code
        $arr = array('RB1', 'RB2', 'RB3', 'RB4', 'RB5');
        $r = 4;
        $n = sizeof($arr);
        $this->printCombination($arr, $n, $r);
        print_r($this->output);

        $this->assertTrue(true);
    }

    function generate_combinations(array $data, array &$all = array(), array $group = array(), $value = null, $i = 0)
    {
        $keys = array_keys($data);
        if (isset($value) === true) {
            array_push($group, $value);
        }
        if ($i >= count($data)) {
            array_push($all, $group);
        } else {
            $currentKey = $keys[$i];
            $currentElement = $data[$currentKey];
            foreach ($currentElement as $val) {
                $this->generate_combinations($data, $all, $group, $val, $i + 1);
            }
        }
        return $all;
    }

    function array_flatten($array)
    {
        $return = array();
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $return = array_merge($return, $this->array_flatten($value));
            } else {
                $return[$key] = $value;
            }
        }

        return $return;
    }

    /** @test * */
    public
    function test_combo()
    {

        $QB = ['QB1', 'QB2'];
        $RB = ['RB1', 'RB2', 'RB3', 'RB4'];
        $WR = ['WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6'];
        $TE = ['TE1', 'TE2'];
        $DEF = ['DEF1', 'DEF2'];
        $FLEX = ['RB1', 'RB2', 'RB3', 'RB4', 'WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6', 'TE1', 'TE2'];


        $data = array(
            (new Combinations($QB, 2))->toArray(),
            (new Combinations($RB, 2))->toArray(),
            (new Combinations($WR, 2))->toArray(),
            (new Combinations($TE, 1))->toArray(),
            (new Combinations($DEF, 1))->toArray(),
//            [['RB1', 'RB2'], ['RB1', 'RB3'], ['RB1', 'RB4'], ['RB2', 'RB3'], ['RB2', 'RB4'], ['RB3', 'RB4']],
//            [['TE1'], ['TE2']]
        );

//        dump($data);

        $teams = (new Permutations($data))->generator();
//        $t = 0;
//        $flatten = [];
        foreach ($teams as $team) {
            print_r($this->array_flatten($team));
//            $t++;
        }
//        print_r($t);


//        $combos = $this->generate_combinations($data);
//        foreach ($combos as $combo) {
//            dump($this->array_flatten($combo));
//        }
        $this->assertTrue(true);
    }


}
