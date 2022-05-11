import datetime
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import pandas as pd
from discordwebhook import Discord

filePath = "/tmp/sample.png"
today = datetime.date.today()

characterData = {
  "dragoon": 47,
}

print(characterData["dragoon"])
print(today)

def makeGraph():
  fig = plt.figure()
  ax = fig.add_subplot(1,1,1)

  x = pd.date_range('2022-05-08', today, freq='D')
  y = [130, 155, 1243, 111]

  ax.plot(x,y)

  days = mdates.DayLocator()
  daysFmt = mdates.DateFormatter('%m/%d')
  ax.xaxis.set_major_locator(days)
  ax.xaxis.set_major_formatter(daysFmt)

  plt.savefig(filePath)

def postDiscord():
  # Create the webhook. 
  discord = Discord(url="")
  discord.post(
    file={
      "file1": open(filePath, "rb")
    }
  )


def handler(event, context):
  makeGraph()
  postDiscord()
  return 0

# postDiscord()
handler("", "")