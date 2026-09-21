# Technician Availability — Ground D
79th Sant Nirankari Samagam

Phone-friendly board: how many technicians of each trade are with us in
Ground D on a given date, with names and tap-to-call numbers, and an A4
print per trade.

    index.html     the whole board (no build step)
    api/sheet.js   reads the published sheet on the server, returns CSV

Data entry:  https://forms.gle/TwB8Wz9uZmQzwAPg7
Data sheet:  https://docs.google.com/spreadsheets/d/1iLdx6b2Q74fbdZuk5uU-39QInbHet1Pfk950KA-A9wk/edit

Someone is with us on a date when DOA is on or before it and DOD is blank or
on or after it. Form rows (those with a Timestamp) are read in the sheet's
own date order; typed rows without a Timestamp are read day-first.

The sheet must stay published (File -> Share -> Publish to web) with
"Automatically republish when changes are made" ticked.
