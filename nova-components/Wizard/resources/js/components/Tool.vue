<template>


    <div>
        <card class="bg-white   items-center justify-center" style="min-height: 300px">
            <form-wizard @on-complete="onComplete"
                         shape="tab"
                         color="#9b59b6" class="p-3" title="New Project Wizard" subtitle="">
                <tab-content
                    icon="fa fa-user" :before-change="beforeTabSwitch">

                    <div class="card">
                        <div class="border-b border-40">
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6">
                                    <label for="name"
                                           class="inline-block text-80 pt-2 leading-tight">
                                        Project Name
                                    </label>
                                </div>
                                <div class="py-6 px-8 w-3/5"><input id="name" dusk="name" type="text" placeholder="Name"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6">
                                    <label for="description" class="inline-block text-80 pt-2 leading-tight">
                                        Description
                                    </label>
                                </div>
                                <div class="py-6 px-8 w-3/5"><input id="description" dusk="description" type="text"
                                                                    placeholder="Description"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6"><label for="domain"
                                                                    class="inline-block text-80 pt-2 leading-tight">
                                    Domain
                                </label></div>
                                <div class="py-6 px-8 w-3/5"><input id="domain" dusk="domain" type="text"
                                                                    placeholder="Domain"
                                                                    class="w-full form-control form-input form-input-bordered">
                                    <!---->
                                    <div class="help-text help-text mt-2"></div>
                                </div>
                            </div>
                            <div class="w-full flex border-b border-40">
                                <div class="w-1/5 px-8 py-6"><label for="type"
                                                                    class="inline-block text-80 pt-2 leading-tight">
                                    Type
                                </label></div>
                                <div class="py-6 px-8 w-3/5">
                                    <multiselect id="type" v-model="project.type"
                                                 :options="options"
                                                 :multiple="true"
                                                 :close-on-select="true"
                                                 placeholder="Choose the project types"
                                                 label="name"
                                                 track-by="name">
                                    </multiselect>
                                </div>
                            </div>
                        </div>
                    </div>
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
<style scoped src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>

    import Multiselect from 'vue-multiselect'

    // import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import {FormWizard, TabContent} from 'vue-form-wizard';

    export default {
        components: {
            FormWizard,
            TabContent,
            Multiselect
        },
        data() {
            return {
                selected: null,
                options:[   { name: 'Web'},
                    { name: 'API'},
                    { name: 'Android'},
                    { name: 'IOS'}],
                project:{
                    name:'',
                    description:'',
                    domain:'',
                    type:''
                }
            }
        },
        methods: {
                onComplete: function () {
                    alert('Yay. Done!');
                }
                ,
                beforeTabSwitch: function () {
                    // alert("This is called before switching tabs")
                    return true;
                }
            }
        ,
    }
</script>


