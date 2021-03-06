var Dashboard = React.createClass({

  render() {

    var lessonCount       = Helper.getTotalLessonCount(this.props.lessonPeriods);
    var pricingData       = this.props.pricingData;
    var paymentOne        = Pricer.monetize(pricingData.payments[0]);
    var totalDiscount     = Pricer.monetize(pricingData.currentPricing.discount);
    var possibleDiscount  = Pricer.monetize(pricingData.currentPricing.possibleDiscount);
    var maxDiscountClass  = totalDiscount == possibleDiscount ? "max-discount" : "";
    var start_date        = this.props.appSettings.summerStartDate.value;
    var firstPayment      = Helper.getPaymentStrings(start_date)[0];

    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li role="separator" className="divider"></li>
          <li className="total-lessons"><a>
            <span className="header-small">Lessons:</span> 
            <span className="header-large">{lessonCount}</span>
          </a></li>
          <li role="separator" className="divider"></li>
          <li id="possibleDiscount" className={"possible-discount"}>
            <a>
              <span className="header-small">Possible Discount:</span> 
              <span className={"header-large " + maxDiscountClass}>
                {possibleDiscount}
              </span>
            </a>
          </li>                
          <li role="separator" className="divider"></li>
          <li id="currentDiscount" className="current-discount">
            <a data-tip data-for='ttDiscountDetails'>
              <span className="header-small">Current Discount:</span> 
              <span className="header-large">{totalDiscount}</span>
            </a>
            <ReactTooltip id='ttDiscountDetails' type='dark' effect='solid'  
                          place='bottom' className="tt-discount-details">
              <DiscountDetails  {...this.props} />
            </ReactTooltip>           
          </li>   
          <li role="separator" className="divider"></li>
          <li id="totalOwed" className="total-owed">
            <a data-tip data-for='ttPaymentInfo'>
              <span className="header-small">Due {firstPayment}:</span>
              <span className="header-large">{paymentOne}</span>
            </a>
            <ReactTooltip id='ttPaymentInfo' type='dark' effect='solid' place='bottom'>
              <PaymentPlan {...this.props} />
            </ReactTooltip>
          </li>
          <li className="nav-help-icon">
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#welcomeMessage">
              ?
            </button>
          </li>
        </ul>
      </div>
    )
  }
  
});