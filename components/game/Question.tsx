import React, { useState } from 'react'
import {
    View,
    Text,
    useWindowDimensions,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { extractClubTypeSeason } from '../../services/factory/Game'
import { useAppSelector } from '../../store/hooks/hooks'
import PlayedWith from './Question/PlayedWith'
// import Club from './Question/Club'
import ClubType from './Question/ClubType'
import ClubFormation from './Question/ClubFormation'
import ClubPalmares from './Question/ClubPalmares'
import PlayerPic from './Question/PlayerPic'
import PlayerPalmares from './Question/PlayerPalmares'
import PlayerWC from './Question/PlayerWC'
import PlayerNationality from './Question/PlayerNationality'

interface IProps {
    data: any
    type: any
}

interface IQProps {
    type: string
    data: any
}

/** const Question = ({ type, data }: IQProps) => {
    if (type === 'played') return <PlayedWith data={data} />
    if (type === 'club') return <Club data={data} />
    if (type === 'formation') return <ClubFormation data={data} />
    if (type === 'CPalmares') return <ClubPalmares data={data} />
    if (type === 'PPic') return <PlayerPic data={data} />
    if (type === 'PPalmares') return <PlayerPalmares data={data} />
    if (type === 'PlayerWC') return <PlayerWC data={data} />
    return null
} */

const Question = ({ type, data }: IQProps) => {
    if (type === 'who_is_this_player_by_nationality')
        return <PlayerNationality data={data} />
    if (type === 'who_is_this_player_by_teammate')
        return <PlayedWith data={data} />
    if (type === 'who_is_this_club') return <ClubType data={data} />
    if (type === 'who_is_this_club_type') return <ClubFormation data={data} />
    if (type === 'who_is_this_club_by_palmares')
        return <ClubPalmares data={data} />
    if (type === 'who_is_this_player_by_photos')
        return <PlayerPic data={data} />
    if (type === 'who_is_this_player_by_palmares')
        return <PlayerPalmares data={data} />
    if (type === 'who_is_this_player') return <PlayerWC data={data} />
    return null
}

export default ({ data, type }: IProps) => {
    const mode = useAppSelector((state) => state.mode)
    const { height, width } = useWindowDimensions()
    const questionHeight = height / 2
    const [open, setOpen] = useState(mode.dev)

    const handleClose = () => {
        setOpen(false)
    }

    const getQuestion = (Qtype: string) => {
        switch (Qtype) {
            case 'who_is_this_player_by_teammate':
                return 'Quel est ce joueur qui a joué le plus souvent avec ces joueurs-ci ?'
            case 'who_is_this_club':
                return 'Quel est ce club ?'
            case 'who_is_this_club_type': {
                const season = extractClubTypeSeason(data)
                return season
            }
            case 'who_is_this_club_by_palmares':
                return 'Quel est ce club ?'
            case 'PPic':
                return 'Qui est ce joueur ?'
            case 'who_is_this_player_by_photos':
                return 'Qui est ce joueur ?'
            case 'who_is_this_player':
                return 'Qui est ce joueur ?'
            case 'who_is_this_player_by_nationality':
                return `Pour quelle équipe nationale a joué ce joueur ?`
            case 'who_is_this_player_by_palmares':
                return `Qui est ce joueur qui a obtenu ces palmarès ?`
            default:
                return ''
        }
    }

    return (
        <View
            style={{
                ...Style.container,
                minHeight: questionHeight,
                maxHeight: questionHeight,
                minWidth: width,
                maxWidth: width,
            }}
        >
            <View
                style={{
                    ...Style.questionData,
                    minHeight: questionHeight - 70,
                    maxHeight: questionHeight - 70,
                    minWidth: width,
                    maxWidth: width,
                }}
            >
                <Question data={data} type={type} />
            </View>
            <View style={{ ...Style.question, minWidth: 359, maxWidth: 359 }}>
                <Text>{`${getQuestion(type)}`}</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                style={{
                    ...Style.container,
                    minWidth: width,
                    maxWidth: width,
                    minHeight: height,
                    maxHeight: height,
                    backgroundColor: 'rgba(27, 36, 68, 0.5)',
                }}
            >
                <View
                    style={{
                        ...Style.container,
                        minWidth: width,
                        maxWidth: width,
                        minHeight: height,
                        maxHeight: height,
                        backgroundColor: 'rgba(27, 36, 68, 0.99)',
                    }}
                >
                    <View style={Style.header}>
                        <Text style={Style.title}>INFO QUESTION</Text>
                    </View>
                    <View style={Style.body}>
                        <ScrollView style={{ height: 610, width: 350 }}>
                            <Text style={Style.debug}>
                                {JSON.stringify(data)}
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={Style.messageContainer}>
                        <Text style={Style.message}>Bon Débogage !</Text>
                    </View>
                    <View style={Style.footer}>
                        <TouchableOpacity
                            onPress={handleClose}
                            style={{
                                ...Style.footerButton,
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            <Text style={{ color: '#1B2444' }}>OK !</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 10,
    },
    questionData: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 50,
        maxHeight: 50,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 610,
        maxHeight: 610,
    },
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 66,
        maxHeight: 66,
    },
    message: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        minWidth: 350,
        maxWidth: 350,
        minHeight: 55,
        maxHeight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 172,
        maxWidth: 172,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    debug: {
        color: '#FFFFFF',
        fontSize: 13,
    },
})
