<script setup lang="ts"></script>
<template>
    <div>
        <div class="w-full flex justify-center mt-8 md:mt-16">
            <div class="w-3/4 md:w-1/2">
                <article class="prose dark:prose-invert text-center">
                    <h1>Stake-to-Subscribe</h1>
                    <p
                        >Enjoy premium features on top of ATOM staking <br />rewards (~10% APR) by
                        staking with our validator
                    </p>
                    <p></p>
                    <!-- ... -->
                </article>
                <input type="range" min="0" max="100" value="40" class="range range-accent mt-10" />
                <div class="mt-4">
                    <div class="form-control">
                        <label class="input-group">
                            <input
                                type="text"
                                placeholder="40"
                                min="1"
                                max="1000000"
                                class="input input-bordered"
                            />
                            <span>ATOM Staked</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-3 mx-10 lg:mx-32 my-10">
            <div class="basis-1/3 bg-base-200 h-96">320×568</div>
            <div class="basis-1/3 bg-base-200 h-96">320×568</div>
            <div class="basis-1/3 bg-base-200 h-96">320×568</div>
        </div>
    </div>
</template>
