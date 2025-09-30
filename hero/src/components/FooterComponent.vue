<script setup>
</script>
<template>
    <footer>
        <nav>
            <section class="footer1">
                <ul>
                    <li class="social">
                        <a href="https://www.facebook.com/?locale=pt_BR" class="icon-social">
                            <font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
                    </li>
                    <li class="social">
                        <a href="https://x.com/" class="icon-social">
                            <font-awesome-icon :icon="['fab', 'twitter']" /></a>
                    </li>
                    <li class="social">
                        <a href="https://br.linkedin.com/" class="icon-social">
                            <font-awesome-icon :icon="['fab', 'instagram']" /> </a>
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
                    <img src="/logo-branca.png" alt="logo">
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
    padding: 2vw 0 0 0;
    text-align: center;
    background: linear-gradient(to right, #1b2353 0%, #276394 55%, #1f9494 100%);
    font-weight: 500;
    margin-top: 8vw;
}

.logo-footer img {
    height: 4vw;
    width: auto;
    margin: 1vw 0;
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
    font-weight: 600;
}

.social a.icon-social {
    color: rgb(250, 249, 246);
    background-color: black;
    padding: 13px 15px 13px 15px;
    border-radius: 100%;
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
    padding: 1vw 0;
}

.footer2 p {
    color: rgb(250, 249, 246);
    margin: 0;
}

@media (max-width: 1400px) {
    .contato span {
        font-size: 1.3rem;
    }

    .contato p {
        margin: 4px 0;
        font-size: 1rem;
    }

    .footer2 p {
        font-size: 0.8rem;
    }
}

@media (max-width: 950px) {
    .contato span {
        font-size: 1.2rem;
    }

    .contato p {
        margin: 4px 0;
        font-size: 1rem;
    }

    .footer2 p {
        font-size: 0.8rem;
    }
}

@media (max-width: 750px) {
    .contato span {
        font-size: 1.3rem;
    }

    .contato p {
        margin: 4px 0;
        font-size: 0.9rem;
    }

    .footer2 p {
        font-size: 0.7rem;
    }

    .social a.icon-social {
        padding: 10px 12px 10px 12px;
    }
}

@media (max-width: 550px) {
    .contato span {
        font-size: 1.2rem;
    }

    .social a.icon-social {
        padding: 8px 10px 8px 10px;
    }

    .contato p {
        margin: 4px 0;
        font-size: 0.9rem;
    }
}

@media (max-width: 500px) {
    .contato span {
        font-size: 1rem;
    }

    .contato p {
        margin: 4px 0;
        font-size: 0.7rem;
    }

    .footer2 p {
        font-size: 0.6rem;
    }

    .logo-footer img {
        height: 5vw;
    }

    .social a.icon-social {
        padding: 5px 7px 5px 7px;
    }

    .social a {
        font-size: 0.8rem;
    }
}
</style>
