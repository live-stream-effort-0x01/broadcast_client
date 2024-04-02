import { createSignal } from "solid-js";
import { Component } from "solid-js";

interface AddTokenFormProps {
    onClose: () => void;
}

const AddTokenForm: Component<AddTokenFormProps> = (props) => {

    const [cardNumber, setCardNumber] = createSignal<string>("");
    const [cardHolder, setCardHolder] = createSignal<string>("");
    const [cvc, setCvc] = createSignal<string>("");

    return (
        <div class='form-wrapper'>
            <span class='form-title'>Add Money for Tokens</span>
            <form class="form-post">
                <div class="form-main">
                    <div class="form-group-main">
                        <input
                            class="form-input-value"
                            type="text"
                            placeholder="Card Number"
                            required
                            onInput={(event) => setCardNumber(event.target.value)} />
                    </div>
                    <div class="form-group-main">
                        <input
                            class="form-input-value"
                            type="text"
                            placeholder="Card Holder"
                            required
                            onInput={(event) => setCardHolder(event.target.value)} />
                    </div>
                    <div class="form-group-label">
                            <label for="expiryDate">Expiry Date</label>
                        </div>
                    <div class="form-group-main">
                        <input
                            id="expiryDate"
                            class="form-input-second-value"
                            type="text"
                            pattern="\d{2}/\d{2}"
                            placeholder="MM/YY"
                            required
                            onInput={(event) => setCardNumber(event.target.value)} />
                        <input
                            id="cvc"
                            class="form-input-second-value"
                            type="text"
                            placeholder="CVC"
                            required
                            onInput={(event) => setCvc(event.target.value)} />
                    </div>
                </div>
                <div class="form-btn">
                    <button
                        type="submit"
                        class="form-btn-submit">
                        <div class="form-btn-submit-title">Submit</div>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTokenForm;
