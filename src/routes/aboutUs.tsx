import { Component } from "solid-js";
import '~/components/About Us/AboutUs.css'
import NavBar from "~/components/NavBar/NavBar";

const AboutUs: Component = () => {
    return (
        <div>
            <NavBar />
            <section class="about-us-container">
                <h1 class="about-title">About Us</h1>
                <div class="about-card">
                <p class="about-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius diam nec nulla luctus, vel eleifend enim ultrices. Integer quis enim sit amet turpis fringilla commodo. Duis auctor metus et ligula cursus, sit amet varius odio aliquet. Sed nec volutpat ipsum. Integer ut suscipit purus, vel sollicitudin mauris. Quisque sagittis ex non felis interdum, sit amet fermentum sapien suscipit. Vivamus rhoncus ante vitae purus lacinia, nec tempus lacus cursus. Sed eu leo neque. Donec suscipit nisi nisi, nec egestas est hendrerit id. Nullam ullamcorper dolor ligula, at condimentum quam iaculis in. Sed nec nulla nec nibh laoreet sollicitudin nec id magna.
                </p>
                </div>
                
            </section>
        </div>
    )
}

export default AboutUs;