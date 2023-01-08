import React, { Fragment, Component } from 'react';
import moment from 'moment';

export class SaleInquiry extends Component {
    static displayName = SaleInquiry.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], isDataFetched: false, startDate: moment(new Date()).format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") };
    }

    componentDidMount() {
    }

    async getSaleDetail(transactionId) {
        const response = await fetch('sale/' + transactionId);
        const data = await response.json();
        const newSales = [...this.state.sales];
        let saleIndex = newSales.findIndex(item => { return item.transactionId === transactionId });
        newSales[saleIndex].hasDetail = true;
        newSales[saleIndex].pan = data.pan;
        newSales[saleIndex].responseCode = data.responseCode;
        newSales[saleIndex].cardType = data.cardType;
        this.setState({ sales: newSales, isDataFetched: true });
    }

    renderSaleDetail(sale) {
        return (
            <Fragment>
                {"PAN: " + sale.pan}
                <br></br>
                {"Card Type: " + sale.cardType}
                <br></br>
                {"Response Code: " + sale.responseCode}
            </Fragment>
        );
    }

    renderSalesTable(sales) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Trasaction ID</th>
                        <th>Amount</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) =>
                        <tr key={index}>
                            <td className="sale-cell">{moment(sale.timestamp).format("DD-MM-YYYY HH:mm:ss")}</td>
                            <td className="sale-cell">{sale.transactionId}</td>
                            <td className="sale-cell">{sale.amount + " " + sale.currency}</td>
                            <td className="sale-cell sale-details">{sale.hasDetail ? this.renderSaleDetail(sale) : <button className="btn btn-primary" onClick={() => { this.getSaleDetail(sale.transactionId) }}>?</button>}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.isDataFetched
            ? this.state.sales.length < 1 ? <p><em>Data Not Found</em></p > : this.renderSalesTable(this.state.sales)
            : <Fragment></Fragment>;

        return (
            <div>
                <h1 id="tabelLabel" >Sale Inquiry</h1>
                <div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Start Date</label>
                        </div>
                        <div className="col-2">
                            <input type="date" className="form-control" value={this.state.startDate} onChange={(event) => { this.onStartDateChange(event) }}></input>
                        </div>
                        <div className="col-2">
                            <label className="col-form-label">End Date</label>
                        </div>
                        <div className="col-2">
                            <input type="date" className="form-control" value={this.state.endDate} onChange={(event) => { this.onEndDateChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="col-form-label">Minimum Amount</label>
                        </div>
                        <div className="col-2">
                            <input type="number" className="form-control" value={this.state.minimumAmount} onChange={(event) => { this.onMinimumAmountChange(event) }}></input>
                        </div>
                        <div className="col-2">
                            <label className="col-form-label">Maximum Amount</label>
                        </div>
                        <div className="col-2">
                            <input type="number" className="form-control" value={this.state.maximumAmount} onChange={(event) => { this.onMaximumAmountChange(event) }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={() => { this.getSales() }}>Get Sales</button>
                        </div>
                    </div>
                    <div className="row">
                        {contents}
                    </div>
                </div>
            </div>
        );
    }

    async getSales() {
        const request = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            minimumAmount: this.state.minimumAmount,
            maximumAmount: this.state.maximumAmount ? this.state.maximumAmount : Number.MAX_SAFE_INTEGER
        };
        const response = await fetch('sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(request)
        })
        const data = await response.json();
        this.setState({ sales: data, isDataFetched: true });
    }

    onStartDateChange(event) {
        this.setState({ ...this.state, startDate: event.target.value });
    }

    onEndDateChange(event) {
        this.setState({ ...this.state, endDate: event.target.value });
    }

    onMinimumAmountChange(event) {
        if (event.target.value.length > 6) {
            return;
        }
        this.setState({ ...this.state, minimumAmount: event.target.value });
    }

    onMaximumAmountChange(event) {
        if (event.target.value.length > 6) {
            return;
        }
        this.setState({ ...this.state, maximumAmount: event.target.value });
    }
}
