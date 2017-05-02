var Confirmation = React.createClass({

  render() {
    var total = Pricer.monetize(this.props.pricingData.currentPricing.totalOwed);
    var payment = Pricer.monetize(this.props.pricingData.currentPricing.payment);

    return ( 
      <div className='confirmation-page col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'> 
        <button className='btn btn-default' onClick={this.props.toggleConfirming}>Back</button>
        <div className='confirmation-text'>
          <p>Here is a quick breakdown of your payments for this summer.</p>
          <PaymentPlan  total={total} payment={payment} />
          <p>If everything looks good, just click the green button!</p>
        </div>
        <div>
          <button className="btn btn-success confirmation-button" 
                  onClick={this.props.submitForm}>Submit Form!</button>
        </div>
      </div>
    )
  }
  
});