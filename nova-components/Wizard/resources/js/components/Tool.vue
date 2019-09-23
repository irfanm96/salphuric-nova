<template>


    <div>
        <card class="bg-white   items-center justify-center" style="min-height: 300px">
            <form-wizard @on-complete="onComplete"
                         shape="tab"
                         color="#9b59b6" class="p-3">
                <tab-content
                    icon="fa fa-user" :before-change="beforeTabSwitch">
                    My first tab content ajKKKKKKKKKKKKKKKKKK L JA KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                </tab-content>
                <tab-content
                    icon="fa fa-cog">
                    My second tab content
                </tab-content>
                <tab-content
                    icon="fa fa-check-circle">
                    Yuhuuu! This seems pretty damn simple
                </tab-content>
            </form-wizard>

        </card>
    </div>
</template>
<script>
    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import {FormWizard, TabContent} from 'vue-form-wizard';

    export default {
        components: {
            FormWizard,
            TabContent
        },
        methods: {
            onComplete: function () {
                alert('Yay. Done!');
            },
            beforeTabSwitch: function () {
                // alert("This is called before switching tabs")
                return true;
            }
        },
    }
</script>


