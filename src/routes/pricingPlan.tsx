import { createSignal } from "solid-js";
import { Component } from "solid-js";
import '~/Pricing Plan/PricingPlan.css'
import AddTokenForm from '~/components/Form/AddTokenForm';
import Popup from '~/components/Popup/Popup';

const PricingPlan: Component = () => {

    const [showModal, setShowModal] = createSignal(false);
    const [typeModal, setTypeShowModal] = createSignal(true);
    const [isBlur, setIsBlur] = createSignal(false);

    const addToken = () => {
        setShowModal(true)
        setTypeShowModal(false)
        setIsBlur(true);
    }
    const closeModal = () => {
        setShowModal(false);
        setIsBlur(false);
    };



    return (
        <section class={`pricing-plan-container ${isBlur() ? 'blurred' : ''}`}>
            <div class="pricing-plan">
                <div class="pricing-plan-header">
                    <h1 class="pricing-plan-title">Basic Plan</h1>
                    <h2 class="pricing-plan-summary">For those getting started</h2>
                </div>
                <div class="pricing-plan-description">
                    <ul class="pricing-plan-list">
                        <li class="pricing-plan-feature">Access to a limited number of rooms (up to 3)</li>
                        <li class="pricing-plan-feature">Limited messaging functionality with creators</li>
                        <li class="pricing-plan-feature">Basic customer support</li>
                    </ul>
                </div>
                <div class="pricing-plan-actions">
                    <p class="pricing-plan-cost"> $9.99</p>
                    <p class="pricing-plan-text">per month</p>
                    <button class="pricing-plan-button" onclick={() => {
                        console.log("Button clicked!");
                        addToken();
                    }}>Purchase</button>
                    {showModal() && !typeModal() && (
                        <Popup onClose={closeModal}>
                            <AddTokenForm onClose={closeModal} />
                        </Popup>
                    )}
                </div>

            </div>
            <div class="pricing-plan pricing-plan-highlighted">
                <div class="pricing-plan-special-text">Recommended</div>
                <div class="pricing-plan-header">
                    <h1 class="pricing-plan-title">Standard Plan</h1>
                    <h2 class="pricing-plan-summary">For those seeking more</h2>
                </div>
                <div class="pricing-plan-description">
                    <ul class="pricing-plan-list">
                        <li class="pricing-plan-feature">Access to a larger number of rooms (up to 7)</li>
                        <li class="pricing-plan-feature">Standard access to exclusive content from creators</li>
                        <li class="pricing-plan-feature">Priority customer support</li>
                    </ul>
                </div>
                <div class="pricing-plan-actions">
                    <p class="pricing-plan-cost"> $19.99</p>
                    <p class="pricing-plan-text">per month</p>
                    <button class="pricing-plan-button" onclick={() => {
                        console.log("Button clicked!");
                        addToken();
                    }}>Purchase</button>
                    {showModal() && !typeModal() && (
                        <Popup onClose={closeModal}>
                            <AddTokenForm onClose={closeModal} />
                        </Popup>
                    )}
                </div>
            </div>
            <div class="pricing-plan">
                <div class="pricing-plan-header">
                    <h1 class="pricing-plan-title">Premium Plan</h1>
                    <h2 class="pricing-plan-summary">For the ultimate experience</h2>
                </div>
                <div class="pricing-plan-description">
                    <ul class="pricing-plan-list">
                        <li class="pricing-plan-feature">Unlimited access to all rooms</li>
                        <li class="pricing-plan-feature">Unlimited and enhanced messaging functionality with creators</li>
                        <li class="pricing-plan-feature">Premium customer support</li>
                    </ul>
                </div>
                <div class="pricing-plan-actions">
                    <p class="pricing-plan-cost"> $49.99</p>
                    <p class="pricing-plan-text">per month</p>
                    <button class="pricing-plan-button" onclick={() => {
                        console.log("Button clicked!");
                        addToken();
                    }}>Purchase</button>
                    {showModal() && !typeModal() && (
                        <Popup onClose={closeModal}>
                            <AddTokenForm onClose={closeModal} />
                        </Popup>
                    )}
                </div>
            </div>
        </section>

    )
}

export default PricingPlan;