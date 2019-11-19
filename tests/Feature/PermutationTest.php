<?php

namespace Tests\Feature;

use drupol\phpermutations\Iterators\Combinations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use ItvisionSy\SimpleORM\RawSQL;
use mysqli;
use Tests\TestCase;

class PermutationTest
{



    public function get_profiles()
    {

        $con = mysqli_connect("localhost", "fawzan", "password", "players");

        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        $sql = "SELECT Id, NickName FROM la_nfl ";

        $team = [];

        if ($result = mysqli_query($con, $sql)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                $team[$row[0]] = $row[1];
            }
            // Free result set
            mysqli_free_result($result);
        }

        mysqli_close($con);


        return $team;
    }


    public function get_cost()
    {

        $con = mysqli_connect("localhost", "fawzan", "password", "players");
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        $sql = "SELECT Id, Salary FROM la_nfl ";

        $team = [];

        if ($result = mysqli_query($con, $sql)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                $team[$row[0]] = $row[1];
            }
            // Free result set
            mysqli_free_result($result);
        }

        mysqli_close($con);

        return $team;
    }


    public function get_rows($pos)
    {

        $con = mysqli_connect("localhost", "fawzan", "password", "players");

        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        $sql = "SELECT Id FROM la_nfl WHERE PlayerPosition = '" . $pos . "' ";

        $team = [];

        if ($result = mysqli_query($con, $sql)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                $team[] = $row[0];
            }
            // Free result set
            mysqli_free_result($result);
        }

        mysqli_close($con);

        return $team;
    }

    /** @test * */
    public function test_combinations_with_two_elements()
    {


        $QB = $this->get_rows('QB'); // ['QB1', 'QB2'];
        $RB = $this->get_rows('RB'); //['RB1', 'RB2', 'RB3', 'RB4'];
        $WR = $this->get_rows('WR'); //['WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6'];
        $TE = $this->get_rows('TE'); //['TE1', 'TE2'];
        $DEF = $this->get_rows('D'); //['DEF1', 'DEF2'];
        $FLEX = array_merge($RB, $WR, $TE);
//        $FLEX = $this->get_rows('QB'); //['RB1', 'RB2', 'RB3', 'RB4', 'WR1', 'WR2', 'WR3', 'WR4', 'WR5', 'WR6', 'TE1', 'TE2'];


        $rb_combinations = new Combinations($RB, 2);
        $rb_teams = $rb_combinations->toArray();
//        dump($rb_teams);

        $qb_combinations = new Combinations($QB, 1);
        $qb_teams = $qb_combinations->toArray();
//        dump($qb_teams);

        $wr_combinations = new Combinations($WR, 3);
        $wr_teams = $wr_combinations->toArray();
//        dump($wr_teams);

        $te_combinations = new Combinations($TE, 1);
        $te_teams = $te_combinations->toArray();
//        dump($te_teams);

        $def_combinations = new Combinations($DEF, 1);
        $def_teams = $def_combinations->toArray();
//        dump($def_teams);


        $data = [
            $rb_teams, $qb_teams, $wr_teams, $te_teams, $def_teams
        ];

        $combos = $this->generate_combinations($data);
//        $combos = new Combinations($data, 5);


        $new_teams = [];

        foreach ($combos as $combo) {

            $t = $this->array_flatten($combo);


            $diff = array_diff($FLEX, $t);

            foreach ($diff as $d) {
                $new_team = $t;
                $new_team[] = $d;
                $new_teams[] = $new_team;

            }

        }

//        print_r($new_teams);

        foreach ($new_teams as $n) {

            if ($this->get_value($n) <= 60000) {

                dump($this->team_names($n));
                dump($this->get_value($n));
                dump('--------');
            }

        }

    }

    /** @test * */
    public function team_names($team)
    {

        $profiles = $this->get_profiles();
        $costs = $this->get_cost();

        $value = [];
        foreach ($team as $playerId) {

            $value[] = $profiles[$playerId] . ' - $' . $costs[$playerId];
        }

        return $value;
    }

    /** @test * */
    public function get_value($team)
    {

        $cost = $this->get_cost();
        $sum = 0;
        foreach ($team as $player) {
            $sum += $cost[$player];
        }

        return $sum;

//        $this->assertTrue(true);
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

}
