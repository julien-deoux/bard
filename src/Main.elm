port module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


port transportAction : String -> Cmd msg


port electronAction : () -> Cmd msg


port sectionAction : String -> Cmd msg


port sectionsReceiver : (List String -> msg) -> Sub msg


type alias Model =
    { sections : List String }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { sections = [] }
    , Cmd.none
    )


type Msg
    = Play
    | Stop
    | Hi
    | Sections (List String)
    | LoadSection String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Play ->
            ( model
            , transportAction "play"
            )

        Stop ->
            ( model
            , transportAction "stop"
            )

        Hi ->
            ( model
            , electronAction ()
            )

        Sections list ->
            ( { model | sections = list }
            , Cmd.none
            )

        LoadSection section ->
            ( model
            , sectionAction section
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    sectionsReceiver Sections


sectionButton : String -> Html Msg
sectionButton section =
    button [ onClick (LoadSection section) ] [ text section ]


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Play ] [ text "play" ]
        , button [ onClick Stop ] [ text "stop" ]
        , div []
            [ button [ onClick Hi ] [ text "Say hi" ] ]
        , div []
            (List.map sectionButton model.sections)
        ]
