import { createSignal } from "solid-js";
import { Component } from "solid-js";

interface AddTokenFormProps {
    onClose: () => void;
}

const AddTokenForm: Component<AddTokenFormProps> = (props) => {

    const [cardNumber, setCardNumber] = createSignal<string>("");
    const [cardHolder, setCardHolder] = createSignal<string>("");
    const [cvc, setCvc] = createSignal<string>("");
    const [expiryMonth, setExpiryMonth] = createSignal<string>("");
    const [expiryYear, setExpiryYear] = createSignal<string>("");

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
                            value={cardNumber()}
                            required
                            onInput={(event) => setCardNumber(event.target.value)} />
                    </div>
                    <div class="form-group-main">
                        <input
                            class="form-input-value"
                            type="text"
                            placeholder="Card Holder"
                            value={cardHolder()}
                            required
                            onInput={(event) => setCardHolder(event.target.value)} />
                    </div>
                    <div class="form-group-label">
                        <label for="expiryMonth" >Expiry Date</label>
                    </div>
                    <div class="form-group-main">
                        <select
                            id="expiryMonth"
                            title="expiryMonth"
                            class="form-input-second-value"
                            value={expiryMonth()}
                            onChange={(event) => setExpiryMonth(event.target.value)}
                            required
                        >
                            <option value="">Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>

                        <select
                            id="expiryYear"
                            title="Expiry Year"
                            class="form-input-second-value"
                            value={expiryYear()}
                            onChange={(event) => setExpiryYear(event.target.value)}
                            required
                        >
                            <option value="">Year</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                        </select>

                        <input
                            id="cvc"
                            class="form-input-second-value"
                            type="text"
                            placeholder="CVC"
                            value={cvc()}
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
