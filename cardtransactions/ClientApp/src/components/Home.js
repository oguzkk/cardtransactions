import React, { Component, Fragment } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { cardHolder: "", pan: "", expireDate: "", amount: "", currency: "", response: "" };
    }

    onCardHolderChange(event) {
        if (event.target.value.length > 1024) {
            return;
        }
        this.setState({ ...this.state, cardHolder: event.target.value });
    }

    onPanChange(event) {
        if (event.target.value.length > 16) {
            return;
        }
        this.setState({ ...this.state, pan: event.target.value });
    }

    onExpireDateChange(event) {
        if (event.target.value.length > 4) {
            return;
        }
        this.setState({ ...this.state, expireDate: event.target.value });
    }

    onAmountChange(event) {
        if (event.target.value.length > 7 || parseInt(event.target.value) < 0) {
            return;
        }

        this.setState({ ...this.state, amount: event.target.value });
    }

    onCurrencyChange(event) {
        if (event.target.value.length > 3) {
            return;
        }
        this.setState({ ...this.state, currency: event.target.value });
    }

    onAmountKeyDown(event) {
        if (event.key === '-') {
            event.preventDefault();
        }
    }

    async addSale() {
        const request = {
            transactionId: "",
            responseCode: "",
            cardHolder: this.state.cardHolder,
            pan: this.state.pan,
            expireDate: this.state.expireDate,
            amount: this.state.amount,
            currency: this.state.currency
        };
        const response = await fetch('sale/addsale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(request)
        })
        const data = await response.json();
        this.setState({ ...this.state, response: JSON.stringify(data, null, 4) });
    }

    generateTestData() {
        const amount = Math.floor(Math.random() * 500);
        const expireDate = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, "0") + (Math.floor(Math.random() * 10) + 24).toString();
        const pan = (Math.floor(Math.random() * 9000) + 1000).toString() + Math.floor(Math.random() * 10000).toString().padStart(4, "0") + Math.floor(Math.random() * 10000).toString().padStart(4, "0") + Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        let cardHolder = "";

        const firstNameLength = Math.floor(Math.random() * 11) + 5;
        for (var index = 0; index < firstNameLength; index++) {
            cardHolder += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }
        cardHolder += " ";
        const lastNameLength = Math.floor(Math.random() * 11) + 5;
        for (var index = 0; index < lastNameLength; index++) {
            cardHolder += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }

        this.setState({ cardHolder: cardHolder, pan: pan, expireDate: expireDate, amount: amount.toString(), currency: "TL", response: "" });
    }

    render() {
        return (
            <div>
                <h1>Add Sale</h1>
                <div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Cardholder</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" value={this.state.cardHolder} onChange={(event) => { this.onCardHolderChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">PAN</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" value={this.state.pan} onChange={(event) => { this.onPanChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Expire Date</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" value={this.state.expireDate} onChange={(event) => { this.onExpireDateChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Amount</label>
                        </div>
                        <div className="col-2">
                            <input type="number" className="form-control" value={this.state.amount} onChange={(event) => { this.onAmountChange(event) }}
                                onKeyDown={(event) => this.onAmountKeyDown(event)}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Currency</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" value={this.state.currency} onChange={(event) => { this.onCurrencyChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={() => { this.generateTestData() }}>Generate Test Data</button>
                        </div>
                        <div className="col-2 text-right">
                            <button className="btn btn-primary" onClick={() => { this.addSale() }}>Add Sale</button>
                        </div>
                    </div>
                    {
                        this.state.response && <Fragment>
                            <div className="row">
                                <div className="col-4">
                                    <label className="col-form-label">Response</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="col-form-label response-label">{this.state.response}</label>
                                </div>
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }
}
