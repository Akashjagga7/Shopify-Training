<template>
    <div class="modal">
        <div class="container">
            <a href="#" class="btn">
                <img src="https://img.icons8.com/color/420/google-maps.png">
            </a>
            <div class="modal__title">{{ title }}</div>
            <p>{{ description }}</p>
            <div class="close-modal" @click="closeModal">Close</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        title: {
            type: String,
            default: () => "Title"
        },
        description: {
            type: String,
            default: () => "Description"
        },
        closeModal: {
            type: Function
        }
    }
};

</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal .container {
    width: 500px;
    height: 400px;
    background: #fff;
    overflow: auto;
    position: relative;
}
.close-modal {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
</style>