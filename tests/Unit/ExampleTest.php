<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    protected $output = array();


    function printCombination($arr, $n, $r)
    {
        // A temporary array to store
        // all combination one by one
        $data = Array();

        // Print all combination using
        // temprary array 'data[]'
        $this->combinationUtil($arr, $n, $r,
            0, $data, 0);
    }

    /* arr[] ---> Input Array
    n ---> Size of input array
    r ---> Size of a combination
           to be printed
    index ---> Current index in data[]
    data[] ---> Temporary array to store
                current combination
    i ---> index of current element in arr[] */
    function combinationUtil($arr, $n, $r,
                             $index, $data, $i, $result = array())
    {
        // Current cobination
        // is ready, print it
        if ($index == $r) {
            $temp = [];
            for ($j = 0; $j < $r; $j++)
                $temp[] = $data[$j];
            $this->output[] = $temp;
            return;
        }

        // When no more elements are
        // there to put in data[]
        if ($i >= $n)
            return;

        // current is included, put
        // next at next location
        $data[$index] = $arr[$i];
        $this->combinationUtil($arr, $n, $r,
            $index + 1,
            $data, $i + 1);

        // current is excluded, replace
        // it with next (Note that i+1
        // is passed, but index is not changed)
        $this->combinationUtil($arr, $n, $r,
            $index, $data, $i + 1);
    }

    /** @test * */
    public function test_combination()
    {

        $RB = ['RB1', 'RB2', 'RB3', 'RB4'];
        $r = 2;
        $n = sizeof($RB);
        $this->printCombination($RB, $n, $r);

        $this->assertTrue(true);
    }

    public function testBasicTest()
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
    public function test_combo()
    {

        $QB = ['QB1', 'QB2'];
        $RB = ['RB1', 'RB2', 'RB3', 'RB4'];
        $WR = ['WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6'];
        $TE = ['TE1', 'TE2'];
        $DEF = ['DEF1', 'DEF2'];
        $FLEX = ['RB1', 'RB2', 'RB3', 'RB4', 'WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6', 'TE1', 'TE2'];


        $data = array(
            [['QB1'], ['QB2']],
            [['RB1', 'RB2'], ['RB1', 'RB3'], ['RB1', 'RB4'], ['RB2', 'RB3'], ['RB2', 'RB4'], ['RB3', 'RB4']],
            [['TE1'], ['TE2']]
        );
        $combos = $this->generate_combinations($data);
        foreach ($combos as $combo) {
            dump($this->array_flatten($combo));
        }
        $this->assertTrue(true);
    }


}
