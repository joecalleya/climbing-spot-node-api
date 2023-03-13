
export const timeSeriesQuery = (filterCondition,GroupBy) => {
		
		const timeSeriesQueryText =
			`SELECT
			"shares"."public"."DETA_PRICE"."Symbol",  
				avg("shares"."public"."DETA_PRICE"."Price") as Price,  
				avg("shares"."public"."DETA_PRICE"."UpperBollinger30") as UpperBollinger30, 
				avg("shares"."public"."DETA_PRICE"."LowerBollinger30") as LowerBollinger30, 
				avg("shares"."public"."DETA_PRICE"."movingaverage30") as movingaverage30, 
				avg("shares"."public"."DETA_PRICE"."movingaverage360") as movingaverage360,
				avg("shares"."public"."DETA_PRICE"."movingaverage5") as movingaverage5
				`
				+ ( (GroupBy != 'none') ? `,${GroupBy}` : '')
				+
				` 
			FROM 
				"shares"."public"."DETA_PRICE"
			inner Join 	
					(
						select distinct "symbol",
						"instrumentDescription"
					from 	
						"shares"."public"."DETA_FINANCIALS"
					where 
						"shares"."public"."DETA_FINANCIALS"."Date">(CURRENT_TIMESTAMP - INTERVAL '3 day')
						`
						+ ( (filterCondition) ? `and ${filterCondition}` : '')
						+
						`)
					as subQuery
			on 
				"shares"."public"."DETA_PRICE"."Symbol" = subQuery."symbol"
			where
				"shares"."public"."DETA_PRICE"."Date">(CURRENT_TIMESTAMP - INTERVAL '12 months')
				
			GROUP BY
				"shares"."public"."DETA_PRICE"."Symbol"
				`
				
				+ ( (GroupBy != 'none') ? `,${GroupBy}` : '')
				+
						
			``

				
	return timeSeriesQueryText
			}

export const newsQuery = (filterCondition) => {
return ` 
SELECT *
		FROM 
			"shares"."public"."DETA_EVENTS" as events
		inner join 	
			"shares"."public"."watchlist" as watchlist
		ON
          watchlist.symbol = ANY (symbol_list)
`
+ ( (filterCondition != 'none') ? `where ${filterCondition}` : '')
+
`
		Order by date desc
		`
}
export const financialsSummaryQuery = (filterCondition, GroupBy) => {
	return `
	SELECT 
	sum("shares"."public"."DETA_FINANCIALS"."Cost") as "Cost",
	sum("shares"."public"."DETA_FINANCIALS"."Value") as "Value",
	sum("shares"."public"."DETA_FINANCIALS"."Profit") as "Profit",
	avg("shares"."public"."DETA_FINANCIALS"."pct_return") as "pct_return"
	`
	+ ( (GroupBy != 'none') ? `,${GroupBy}` : '')
	+
	` 
	FROM 
	"shares"."public"."DETA_FINANCIALS"
	inner join 	
						(
							select 
								max("shares"."public"."watchlist"."Date") as Date
							from
							"shares"."public"."watchlist"
													) as Max_Date
	ON
	"shares"."public"."DETA_FINANCIALS"."Date" = Max_Date.date	
	`
	+ ( (filterCondition != 'none') ? `	Where ${filterCondition}` : '')
	+
	`
	`
	+ ( (GroupBy != 'none') ? `group by
	 #${GroupBy}` : '')
	+
	``
	}

export const financialsDetailQuery = (filterCondition) => {
return `
SELECT 
"shares"."public"."DETA_FINANCIALS"."Analysis",
"shares"."public"."DETA_FINANCIALS"."B_E_Price",
"shares"."public"."DETA_FINANCIALS"."Company_Name",
"shares"."public"."DETA_FINANCIALS"."company_news_link",
"shares"."public"."DETA_FINANCIALS"."Cost",
"shares"."public"."DETA_FINANCIALS"."Daily_ftse_position",
"shares"."public"."DETA_FINANCIALS"."Date",
"shares"."public"."DETA_FINANCIALS"."Debt_profit",
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount_last",
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount_last2",
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount",
"shares"."public"."DETA_FINANCIALS"."Dividend_Cash_Ratio",
"shares"."public"."DETA_FINANCIALS"."Dividend_ex_date",
"shares"."public"."DETA_FINANCIALS"."Dividend_Payment_Date",
"shares"."public"."DETA_FINANCIALS"."Dividend_pct_change",
"shares"."public"."DETA_FINANCIALS"."Dividend_Profit_Ratio",
"shares"."public"."DETA_FINANCIALS"."Dividend_trend",
"shares"."public"."DETA_FINANCIALS"."Dividend_Yield",
"shares"."public"."DETA_FINANCIALS"."hasRecentEvent",
"shares"."public"."DETA_FINANCIALS"."hasRecentNews",
"shares"."public"."DETA_FINANCIALS"."Holding",
"shares"."public"."DETA_FINANCIALS"."instrumentDescription",
"shares"."public"."DETA_FINANCIALS"."instrument_sub_description",
"shares"."public"."DETA_FINANCIALS"."isDividendThisMonth",
"shares"."public"."DETA_FINANCIALS"."isDividendThisQuarter",
"shares"."public"."DETA_FINANCIALS"."isDividendThisWeek",
"shares"."public"."DETA_FINANCIALS"."isEventThisMonth",
"shares"."public"."DETA_FINANCIALS"."isEventThisWeek",
"shares"."public"."DETA_FINANCIALS"."ISIN",
"shares"."public"."DETA_FINANCIALS"."last_event_type",
"shares"."public"."DETA_FINANCIALS"."latest_news_date",
"shares"."public"."DETA_FINANCIALS"."liabilities_creditors_short",
"shares"."public"."DETA_FINANCIALS"."liquidity_ratio_score",
"shares"."public"."DETA_FINANCIALS"."liquidity_ratio",
"shares"."public"."DETA_FINANCIALS"."Market_Cap",
"shares"."public"."DETA_FINANCIALS"."movingaverage1day",
"shares"."public"."DETA_FINANCIALS"."movingaverage30",
"shares"."public"."DETA_FINANCIALS"."movingaverage360",
"shares"."public"."DETA_FINANCIALS"."movingaverage5",
"shares"."public"."DETA_FINANCIALS"."Next_dividend"::date,
"shares"."public"."DETA_FINANCIALS"."next_event_type",
"shares"."public"."DETA_FINANCIALS"."Next_Event",
"shares"."public"."DETA_FINANCIALS"."num_shares",
"shares"."public"."DETA_FINANCIALS"."Opportunity",
"shares"."public"."DETA_FINANCIALS"."pct_return",
"shares"."public"."DETA_FINANCIALS"."Portfolio_Flag",
"shares"."public"."DETA_FINANCIALS"."pre_tax_profit_latest",
"shares"."public"."DETA_FINANCIALS"."Previous_Close",
"shares"."public"."DETA_FINANCIALS"."price_average",
"shares"."public"."DETA_FINANCIALS"."price_trend",
"shares"."public"."DETA_FINANCIALS"."Price",
"shares"."public"."DETA_FINANCIALS"."PriceTarget",
"shares"."public"."DETA_FINANCIALS"."Profit_trend",
"shares"."public"."DETA_FINANCIALS"."Profit",
"shares"."public"."DETA_FINANCIALS"."Quarterly_ftse_position",
"shares"."public"."DETA_FINANCIALS"."Range",
"shares"."public"."DETA_FINANCIALS"."Return1Day",
"shares"."public"."DETA_FINANCIALS"."Return30Day",
"shares"."public"."DETA_FINANCIALS"."Return5Day",
"shares"."public"."DETA_FINANCIALS"."Sector",
"shares"."public"."DETA_FINANCIALS"."Spread_Amount",
"shares"."public"."DETA_FINANCIALS"."Spread_Percent",
"shares"."public"."DETA_FINANCIALS"."Spread_Score",
"shares"."public"."DETA_FINANCIALS"."Spread",
"shares"."public"."DETA_FINANCIALS"."stddev1day",
"shares"."public"."DETA_FINANCIALS"."stddev5",
"shares"."public"."DETA_FINANCIALS"."Stoploss",
"shares"."public"."DETA_FINANCIALS"."symbol",
"shares"."public"."DETA_FINANCIALS"."Target_Sale_Price",
"shares"."public"."DETA_FINANCIALS"."TargetDistance",
"shares"."public"."DETA_FINANCIALS"."Total_Debt",
"shares"."public"."DETA_FINANCIALS"."validationScore" ,
"shares"."public"."DETA_FINANCIALS"."Valuation",
"shares"."public"."DETA_FINANCIALS"."Value",
"shares"."public"."DETA_FINANCIALS"."watchlist",
"shares"."public"."DETA_FINANCIALS"."website_address",

date("shares"."public"."DETA_FINANCIALS"."last_event_date") as last_event_date

FROM 
"shares"."public"."DETA_FINANCIALS"
inner join 	
					(
						select 
							max("shares"."public"."watchlist"."Date") as Date
						from
						"shares"."public"."watchlist"
												) as Max_Date
ON
"shares"."public"."DETA_FINANCIALS"."Date" = Max_Date.date
`
+ ( (filterCondition != 'none') ? `where ${filterCondition}` : '')
+
`
order by 
"shares"."public"."DETA_FINANCIALS"."Next_dividend"`
}

export const cashSummaryQuery = (filterCondition, GroupBy) => {
return `
SELECT 
`
+ ( (GroupBy != 'none') ? `${GroupBy},` : '')
+
` 
count("Company_Code") as number_of_trades,
sum(withdrawal) as withdrawal,
sum(deposit) as deposit,
sum(dividend) as dividend,
sum(otherincome) as otherincome,
sum(cash_bal) as cash_bal,
sum(asset_bal) as asset_bal,
sum(cum_asset_bal) as cum_asset_bal,
sum("Trading_bal") as "Trading_bal"
FROM 
"shares"."public"."DETA_CASH_HISTORY"
Where imbalance <> 1 

`
+ ( (filterCondition != 'none') ? `and ${filterCondition}` : '')
+
`
`
+ ( (GroupBy != 'none') ? `group by
 ${GroupBy}` : '')
+
``
}
export const cashDetailQuery = (filterCondition) => {
	console.log(filterCondition)

return `
	SELECT 
	to_char(sell_date, 'YYYY-MM') AS "monthYear",
	"Deal_Ref",
	"Debit",
	"Credit",
	withdrawal,
	"Company",
	deposit ,
	buy ,
	sell ,
	dividend,
	otherincome ,
	cash_bal,
	asset_bal ,
	cum_asset_bal ,
	"Trading_bal",
	pct_return,
	buy_quantity,
	sell_quantity ,
	buy_date ,
	sell_date,
	imbalance,
	"Company_Code",
	"Last_Executed_Price" ,
	"Last_Quantity" 

FROM 
"shares"."public"."DETA_CASH_HISTORY"
where
`
+ ( (filterCondition != 'none') ? `${filterCondition}` : '')
+
`
order by 
"monthYear" desc
,"Company_Code"

`
}

// ((upper( classification ) like 'DIVIDEND%' AND date > CURRENT_TIMESTAMP - INTERVAL '360 day') 
// OR
// (upper( classification ) not like 'DIVIDEND%' AND ))