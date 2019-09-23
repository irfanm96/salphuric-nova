<?php

namespace App\Nova\Actions;

use App\Jobs\ChargeCustomerJob;
use Illuminate\Bus\Queueable;
use Laravel\Nova\Actions\Action;
use Illuminate\Support\Collection;
use Laravel\Nova\Fields\ActionFields;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\Select;

class StartSubscription extends Action
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Perform the action on the given models.
     *
     * @param \Laravel\Nova\Fields\ActionFields $fields
     * @param \Illuminate\Support\Collection $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        foreach ($models as $project) {

            dispatch(new ChargeCustomerJob($project));


        }
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [
            Date::make('Start Date'),
            Select::make('Billing Frequency')->options([
                'monthly' => 'Monthly',
                'annually' => 'Annually',
            ])
        ];
    }
}
