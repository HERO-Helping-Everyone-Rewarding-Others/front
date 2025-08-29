<script setup>
import { CIcon } from '@coreui/icons-vue'
import { cibFacebookF } from '@coreui/icons'
</script>
<template>
    <footer>
        <nav>
            <section class="footer1">
                <ul>
                <li class="social">
                    <a href="https://www.facebook.com/?locale=pt_BR" class="icon-social"></a>
                    <CIcon :icon="cibFacebookF" />
                    
                </li>
                <li class="social">
                    <a href="https://x.com/"><span class="mdi mdi-twitter"></span></a>
                </li>
                <li class="social">
                    <a href="https://br.linkedin.com/"><CIcom :icon="cibLinkedinIn" /></a>
                </li>
            </ul>
            <ul>
                <li class="contato">
                    <span class="mdi mdi-phone"></span>
                    <p>
                        + 123-456-789
                    </p>
                </li>
                <li class="contato">
                    <span class="mdi mdi-email"></span>
                    <p>
                        info@gmail.com
                    </p>
                </li>
            </ul>
            <div class="logo-footer">
                    <img src="/he(1).png" alt="logo">
                </div>
            </section>
            <section class="footer2">
                    <p>
                        Copyright &copy;2025
                    </p>
            </section>
        </nav>
    </footer>
</template>

<style scoped>
    footer {
        margin: 20vw 0 0 0;
        padding: 4vw 0 0 0;
        text-align: center;
        background: linear-gradient(to right, #1b2353 0%, #276394 75%, #43a86a 100%);
        font-weight: 500;
    }
    footer nav section.footer1 {
        text-align: center;
    }
    .logo-footer img {
        height: 70px;
        width: auto;
        margin: 1vw 0 3vw 0;
    }
    footer nav ul {
        display: flex;
        justify-content: center;
    }
    footer nav ul li {
        list-style: none;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 0 20px;
    }
    .social a {
        color: rgb(250, 249, 246);
        background-color: black;
        padding: 10px 15px 10px 15px;
        border-radius: 100%;
    }
    .icon-social {
          fill: #3b5998;
    }
    .contato {
        color: rgb(250, 249, 246);
        padding: 0 20px;
    }
    .contato span {
        font-size: 1.5rem;
        padding: 0 15px;
    }
    .contato p {
        margin: 4px 0;
        font-size: 1.2rem;
    }
    .footer2 {
        background-color: rgb(36, 35, 35);
        padding: 10px 0 1px 0;
    }
    .footer2 p {
        color: rgb(250, 249, 246);
    }
</style>
