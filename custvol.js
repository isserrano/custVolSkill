var https = require('https')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("St Ritas music system!options: dinner, cooking and Liam", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "SetDinnerVol":
              context.succeed(
         //      dinnervol,
               generateResponse(
                buildSpeechletResponse("Music for dinner time!", true),
                 {}
          )
        )

            break;

          case "SetCookingVol":
              context.succeed(
               generateResponse(
                buildSpeechletResponse("Music for cooking time!", true),
                 {}
          )
        )
 
            break;
          case "SetLiamVol":
                        context.succeed(
          generateResponse(
            buildSpeechletResponse("Music for Liam!", true),
            {}
          )
        )
 
            break;  



          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers

dinnervol => {
          return {
              SetVolume: {
                volume: 15
              }
          }
        }
        
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
