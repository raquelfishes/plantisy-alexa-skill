// Alexa dependency
const Alexa = require( 'ask-sdk-core' );
// i18n dependency
const i18n = require( 'i18next' );
// Local includes
const languageStrings = require( './language/languageStrings' );


// Initialize 'handlerInput.t' and 'LOC' with user language or default language.
// This request interceptor will bind a translation function 't' to the handlerInput
// Additionally it will handle picking a random value if instead of a string it receives an array

const LocalizationRequestInterceptor = 
{
    process(handlerInput) 
    {
        const localisationClient = i18n.init( {
            lng: Alexa.getLocale( handlerInput.requestEnvelope ),
            resources: languageStrings,
            returnObjects: true
        } );
        localisationClient.localise = function localise() 
        {
            const args = arguments;
            const value = i18n.t( ...args );
            if ( Array.isArray( value ) ) 
            {
                return value[Math.floor( Math.random() * value.length )];
            }
            return value;
        };
        handlerInput.t = function translate( ...args ) 
        {
            return localisationClient.localise( ...args );
        }
    }
};



  module.exports = 
  {
      LoggingRequestInterceptor,
  }