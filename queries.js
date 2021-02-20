
export const timeSeriesQuery = (filterCondition) => {
		
		const timeSeriesQueryText =
			`SELECT
				DATE_PART('week',"shares"."public"."DETA_PRICE"."Date") as weekNumber,
				"shares"."public"."DETA_PRICE"."Symbol",  
				avg("shares"."public"."DETA_PRICE"."Price") as Price,  
				avg("shares"."public"."DETA_PRICE"."UpperBollinger1") as UpperBollinger1, 
				avg("shares"."public"."DETA_PRICE"."LowerBollinger1") as LowerBollinger1, 
				avg("shares"."public"."DETA_PRICE"."UpperBollinger30") as UpperBollinger30, 
				avg("shares"."public"."DETA_PRICE"."LowerBollinger30") as LowerBollinger30, 
				avg("shares"."public"."DETA_PRICE"."movingaverage30") as movingaverage30, 
				avg("shares"."public"."DETA_PRICE"."movingaverage1day") as movingaverage1day,
				avg("shares"."public"."DETA_PRICE"."movingaverage360") as movingaverage360,
				avg("shares"."public"."DETA_PRICE"."movingaverage5") as movingaverage5
			FROM 
				"shares"."public"."DETA_PRICE"
			inner Join 	
					(
						select distinct "symbol",
								instrument_description
					from 	
						"shares"."public"."DETA_FINANCIALS"
					where 
						"shares"."public"."DETA_FINANCIALS"."instrument_description" = 'Shares'
						and
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
				weekNumber,"shares"."public"."DETA_PRICE"."Symbol"
			order by
				weekNumber`

				
	return timeSeriesQueryText
			}

export const newsQuery = `
		SELECT *
		FROM 
		"shares"."public"."DETA_EVENTS"
		where 
			(upper( classification ) like 'DIVIDEND%' AND date > CURRENT_TIMESTAMP - INTERVAL '360 day') 
			OR
			(upper( classification ) not like 'DIVIDEND%' AND date > CURRENT_TIMESTAMP - INTERVAL '5 day') 
		Order by date desc
		`

export const financialsQuery = (filterCondition) => {

return `
SELECT 
"shares"."public"."DETA_FINANCIALS"."Date", 
"shares"."public"."DETA_FINANCIALS"."symbol", 
"shares"."public"."DETA_FINANCIALS"."Company_Name", 
"shares"."public"."DETA_FINANCIALS"."Sector", 
"shares"."public"."DETA_FINANCIALS"."ISIN", 
"shares"."public"."DETA_FINANCIALS"."Price", 
"shares"."public"."DETA_FINANCIALS"."CompanySize", 
"shares"."public"."DETA_FINANCIALS"."pre_tax_profit_lastyear", 
"shares"."public"."DETA_FINANCIALS"."pre_tax_profit_2yearago", 
"shares"."public"."DETA_FINANCIALS"."Profit_trend", 
"shares"."public"."DETA_FINANCIALS"."Profit_score", 
"shares"."public"."DETA_FINANCIALS"."Market_Cap", 
"shares"."public"."DETA_FINANCIALS"."fifteen_Year_Profits", 
"shares"."public"."DETA_FINANCIALS"."Valuation", 
"shares"."public"."DETA_FINANCIALS"."valuation_score", 
"shares"."public"."DETA_FINANCIALS"."Dividend_ex_date", 
"shares"."public"."DETA_FINANCIALS"."Next_dividend", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount_last2", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount_last", 
"shares"."public"."DETA_FINANCIALS"."Dividend_pct_change", 
"shares"."public"."DETA_FINANCIALS"."Dividend_trend", 
"shares"."public"."DETA_FINANCIALS"."Dividend_score", 
"shares"."public"."DETA_FINANCIALS"."Total_Debt", 
"shares"."public"."DETA_FINANCIALS"."threeyear_profit", 
"shares"."public"."DETA_FINANCIALS"."Debt_profit", 
"shares"."public"."DETA_FINANCIALS"."Debt_profit_score", 
"shares"."public"."DETA_FINANCIALS"."Spread", 
"shares"."public"."DETA_FINANCIALS"."Positional_opportunity", 
"shares"."public"."DETA_FINANCIALS"."price_1_week_high", 
"shares"."public"."DETA_FINANCIALS"."price_1_week_low", 
"shares"."public"."DETA_FINANCIALS"."Price_1_week_average", 
"shares"."public"."DETA_FINANCIALS"."price_1_year_high", 
"shares"."public"."DETA_FINANCIALS"."price_1_year_low", 
"shares"."public"."DETA_FINANCIALS"."Price_1_year_average", 
"shares"."public"."DETA_FINANCIALS"."price_trend", 
"shares"."public"."DETA_FINANCIALS"."price_trend_score", 
"shares"."public"."DETA_FINANCIALS"."validation_score", 
"shares"."public"."DETA_FINANCIALS"."Portfolio_Flag", 
"shares"."public"."DETA_FINANCIALS"."num_shares", 
"shares"."public"."DETA_FINANCIALS"."Cost", 
"shares"."public"."DETA_FINANCIALS"."Value", 
"shares"."public"."DETA_FINANCIALS"."Profit", 
"shares"."public"."DETA_FINANCIALS"."Analysis", 
"shares"."public"."DETA_FINANCIALS"."pct_return", 
"shares"."public"."DETA_FINANCIALS"."price_average", 
"shares"."public"."DETA_FINANCIALS"."B_E_Price", 
"shares"."public"."DETA_FINANCIALS"."Opportunity", 
"shares"."public"."DETA_FINANCIALS"."Watchlist", 
"shares"."public"."DETA_FINANCIALS"."Quarterly_ftse_position", 
"shares"."public"."DETA_FINANCIALS"."Daily_ftse_position", 
"shares"."public"."DETA_FINANCIALS"."Range", 
"shares"."public"."DETA_FINANCIALS"."Return30Day", 
"shares"."public"."DETA_FINANCIALS"."Return50Day", 
"shares"."public"."DETA_FINANCIALS"."pre_tax_profit_latest", 
"shares"."public"."DETA_FINANCIALS"."PriceTarget", 
"shares"."public"."DETA_FINANCIALS"."Previous_Close", 
"shares"."public"."DETA_FINANCIALS"."Spread_Score", 
"shares"."public"."DETA_FINANCIALS"."Spread_Percent", 
"shares"."public"."DETA_FINANCIALS"."Spread_Amount", 
"shares"."public"."DETA_FINANCIALS"."movingaverage30", 
"shares"."public"."DETA_FINANCIALS"."movingaverage50", 
"shares"."public"."DETA_FINANCIALS"."movingaverage360", 
"shares"."public"."DETA_FINANCIALS"."movingaverage5", 
"shares"."public"."DETA_FINANCIALS"."stddev1day", 
"shares"."public"."DETA_FINANCIALS"."movingaverage1day", 
"shares"."public"."DETA_FINANCIALS"."Return1Day", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Yield", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Amount", 
"shares"."public"."DETA_FINANCIALS"."stddev5", 
"shares"."public"."DETA_FINANCIALS"."Return5Day", 
"shares"."public"."DETA_FINANCIALS"."Target_Sale_Price", 
"shares"."public"."DETA_FINANCIALS"."Stoploss", 
"shares"."public"."DETA_FINANCIALS"."Holding", 
"shares"."public"."DETA_FINANCIALS"."TargetDistance", 
"shares"."public"."DETA_FINANCIALS"."Next_Event", 
"shares"."public"."DETA_FINANCIALS"."operating_cash_flow", 
"shares"."public"."DETA_FINANCIALS"."shares_in_issue", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Cash_Ratio", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Profit_Ratio", 
"shares"."public"."DETA_FINANCIALS"."Dividend_Payment_Date", 
"shares"."public"."DETA_FINANCIALS"."instrument_description", 
"shares"."public"."DETA_FINANCIALS"."instrument_sub_description", 
"shares"."public"."DETA_FINANCIALS"."News_text", 
"shares"."public"."DETA_FINANCIALS"."latest_news_date", 
"shares"."public"."DETA_FINANCIALS"."last_event_date", 
"shares"."public"."DETA_FINANCIALS"."last_event_type", 
"shares"."public"."DETA_FINANCIALS"."next_event_type", 
"shares"."public"."DETA_FINANCIALS"."news_links", 
"shares"."public"."DETA_FINANCIALS"."company_news_link", 
"shares"."public"."DETA_FINANCIALS"."liabilities_creditors_short", 
"shares"."public"."DETA_FINANCIALS"."assets_cash_and_securities", 
"shares"."public"."DETA_FINANCIALS"."liquidity_ratio", 
"shares"."public"."DETA_FINANCIALS"."liquidity_ratio_rank", 
"shares"."public"."DETA_FINANCIALS"."liquidity_ratio_score",
"shares"."public"."DETA_FINANCIALS"."isDividendThisWeek",
"shares"."public"."DETA_FINANCIALS"."isDividendThisMonth",
"shares"."public"."DETA_FINANCIALS"."isDividendThisQuarter",
"shares"."public"."DETA_FINANCIALS"."isEventThisWeek",
"shares"."public"."DETA_FINANCIALS"."isEventThisMonth",
"shares"."public"."DETA_FINANCIALS"."hasRecentEvent",
"shares"."public"."DETA_FINANCIALS"."hasRecentNews"
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
+ ( (filterCondition != 'none') ? `Where ${filterCondition}` : '')
+
`
order by 
"shares"."public"."DETA_FINANCIALS"."Next_dividend"`
}