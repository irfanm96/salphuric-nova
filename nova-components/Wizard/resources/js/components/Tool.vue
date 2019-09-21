<template>

    <form-wizard @on-complete="onComplete"
                 shape="tab"
                 color="#9b59b6">
        <tab-content title="Personal details"
                     icon="fa fa-user" :before-change="beforeTabSwitch">
            My first tab content
        </tab-content>
        <tab-content title="Additional Info"
                     icon="ti-settings">
            My second tab content
        </tab-content>
        <tab-content title="Last step"
                     icon="ti-check">
            Yuhuuu! This seems pretty damn simple
        </tab-content>
    </form-wizard>

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
            onComplete: function(){
                alert('Yay. Done!');
            },
            beforeTabSwitch: function(){
                alert("This is called before switching tabs")
                return true;
            }
        },
    }
</script>
