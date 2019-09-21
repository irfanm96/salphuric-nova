<?php

namespace App\Nova;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use OptimistDigital\MultiselectField\Multiselect;

class Projects extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'App\Project';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'domain';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function fields(Request $request)
    {

        $fields = [];
        $fields[] = ID::make()->sortable();
        $fields[] = BelongsTo::make('User')->rules('required');
        $fields[] = Text::make('Name');
        $fields[] = Text::make('Description');
        $fields[] = Text::make('Domain');
        $fields[] = Multiselect::make('Type')
            ->options([
                'web' => 'Web',
                'api' => 'API',
                'android' => 'Android',
                'ios' => 'IOS',
            ])
            ->placeholder('Choose type of the project')->rules('required');
        $fields[] = Select::make('Status')->options([
            'pending' => 'Pending',
            'active' => 'Active',
            'terminated' => 'Terminated',
            'deleted' => 'Deleted',
        ]);

        $fields[]=HasMany::make('Project Products','projectProducts',ProjectProducts::class);

        return $fields;
    }

    /**
     * Get the cards available for the request.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}
