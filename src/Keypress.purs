module Keypress
  ( Key
  , Pressed
  , keypress
  ) where

import Prelude
import Control.Promise (Promise, toAffE)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (Aff)

foreign import keypressImpl :: forall a. (a -> Maybe a) -> Maybe a -> Unit -> Effect (Promise Pressed)

type Pressed
  = { key :: Maybe Key
    , ch :: Maybe Char
    }

type Key
  = { name :: Char
    , ctrl :: Boolean
    , meta :: Boolean
    , shift :: Boolean
    , sequence :: Char
    }

keypress :: Aff Pressed
keypress = toAffE $ keypressImpl Just Nothing unit
