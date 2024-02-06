import React, { useState } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import { useSelector } from 'react-redux'
import LigueStore from '../../services/store/Ligue'
import Input from '../sous-components/Input'
import Select from '../sous-components/Select'

interface IProps {
    setSteps: Function
    setLigue: Function
    setCode: Function
}

const participantItems = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
]

const dayItems = [
    { label: '1 jour', value: 1 },
    { label: '2 jours', value: 2 },
    { label: '3 jours', value: 3 },
    { label: '4 jours', value: 4 },
    { label: '5 jours', value: 5 },
    { label: '6 jours', value: 6 },
    { label: '7 jours', value: 7 },
    { label: '8 jours', value: 8 },
    { label: '9 jours', value: 9 },
    { label: '10 jours', value: 10 },
    { label: '11 jours', value: 11 },
    { label: '12 jours', value: 12 },
    { label: '13 jours', value: 13 },
    { label: '14 jours', value: 14 },
    { label: '15 jours', value: 15 },
    { label: '16 jours', value: 16 },
    { label: '17 jours', value: 17 },
    { label: '18 jours', value: 18 },
    { label: '19 jours', value: 19 },
    { label: '20 jours', value: 20 },
    { label: '21 jours', value: 21 },
    { label: '22 jours', value: 22 },
    { label: '23 jours', value: 23 },
    { label: '24 jours', value: 24 },
    { label: '25 jours', value: 25 },
    { label: '26 jours', value: 26 },
    { label: '27 jours', value: 27 },
    { label: '28 jours', value: 28 },
    { label: '29 jours', value: 29 },
    { label: '30 jours', value: 30 },
]

const levelItems = [
    { label: 'random', value: 0 },
    { label: 'Niveau 1', value: 1 },
    { label: 'Niveau 2', value: 2 },
    { label: 'Niveau 3', value: 3 },
    { label: 'Niveau 4', value: 4 },
    { label: 'Niveau 5', value: 5 },
    { label: 'Niveau 6', value: 6 },
    { label: 'Niveau 7', value: 7 },
    { label: 'Niveau 8', value: 8 },
    { label: 'Niveau 9', value: 9 },
    { label: 'Niveau 10', value: 10 },
    { label: 'Niveau 11', value: 11 },
    { label: 'Niveau 12', value: 12 },
    { label: 'Niveau 13', value: 13 },
    { label: 'Niveau 14', value: 14 },
    { label: 'Niveau 15', value: 15 },
    { label: 'Niveau 16', value: 16 },
    { label: 'Niveau 17', value: 17 },
    { label: 'Niveau 18', value: 18 },
    { label: 'Niveau 19', value: 19 },
    { label: 'Niveau 20', value: 20 },
    { label: 'Niveau 21', value: 21 },
    { label: 'Niveau 22', value: 22 },
    { label: 'Niveau 23', value: 23 },
    { label: 'Niveau 24', value: 24 },
    { label: 'Niveau 25', value: 25 },
    { label: 'Niveau 26', value: 26 },
    { label: 'Niveau 27', value: 27 },
    { label: 'Niveau 28', value: 28 },
    { label: 'Niveau 29', value: 29 },
    { label: 'Niveau 30', value: 30 },
    { label: 'Niveau 31', value: 31 },
    { label: 'Niveau 32', value: 32 },
    { label: 'Niveau 33', value: 33 },
    { label: 'Niveau 34', value: 34 },
    { label: 'Niveau 35', value: 35 },
    { label: 'Niveau 36', value: 36 },
    { label: 'Niveau 37', value: 37 },
    { label: 'Niveau 38', value: 38 },
    { label: 'Niveau 39', value: 39 },
    { label: 'Niveau 40', value: 40 },
    { label: 'Niveau 41', value: 41 },
    { label: 'Niveau 42', value: 42 },
    { label: 'Niveau 43', value: 43 },
    { label: 'Niveau 44', value: 44 },
    { label: 'Niveau 45', value: 45 },
    { label: 'Niveau 46', value: 46 },
    { label: 'Niveau 47', value: 47 },
    { label: 'Niveau 48', value: 48 },
    { label: 'Niveau 49', value: 49 },
    { label: 'Niveau 50', value: 50 },
]

export default ({ setSteps, setLigue, setCode }: IProps) => {
    const { height } = useWindowDimensions()
    const User = useSelector((state: any) => state.user)
    const [name, setName] = useState('')
    const [participant, setParticipant] = useState(1)
    const [duration, setDuration] = useState(1)
    const [difficulty, setDifficulty] = useState(1)

    const onCreate = async () => {
        if (!User?.id) return
        const API = new LigueStore()
        const data = {
            name,
            duration,
            difficulty,
            participant,
            user_id: User.id,
        }
        const response = await API.CreateLigue(data)
        if (response.canceled) return
        setLigue(response.id)
        setCode(response.code)
        setSteps(2)
    }

    return (
        <View>
            <View style={{ maxHeight: height - 250, minHeight: height - 250 }}>
                <ScrollView>
                    <View style={Style.container}>
                        <View style={Style.titleContainer}>
                            <Text style={Style.title}>NOM DE LA LIGUE</Text>
                        </View>
                        <View style={Style.listContainer}>
                            <Text>
                                Choisis un nom pour la ligue que tu souhaites
                                créer. Une fois la ligue commencée, tu ne
                                pourras plus modifier son nom.
                            </Text>
                        </View>
                        <View style={Style.inputContainer}>
                            <Input
                                label={false}
                                labelText=""
                                required
                                icon={false}
                                iconName=""
                                width={375}
                                placeholder="Pichichiz"
                                value={name}
                                onChangeText={setName}
                                secure={false}
                                bottomOnly={false}
                            />
                        </View>
                    </View>
                    <View style={Style.container}>
                        <View style={Style.titleContainer}>
                            <Text style={Style.title}>
                                NOMBRE MAXIMUM DE PARTICIPANTS:
                            </Text>
                        </View>
                        <View style={Style.listContainer}>
                            <Text>
                                Par défaut, le nombre de participants est de 20
                                maximum, mais tu peux choisir un nombre
                                inférieur à la limite maximum.
                            </Text>
                        </View>
                        <View style={Style.inputContainer}>
                            <Select
                                items={participantItems}
                                value={participant}
                                setValue={setParticipant}
                                backgroundColor="#EBECF0"
                                height={41}
                                width={161}
                            />
                        </View>
                    </View>
                    <View style={Style.container}>
                        <View style={Style.titleContainer}>
                            <Text style={Style.title}>DURÉE D'UNE JOURNÉE</Text>
                        </View>
                        <View style={Style.listContainer}>
                            <Text>
                                À toi de définir combien de temps dure une
                                journée de championnat, qui correspond au délai
                                pour jouer. 1 jour minimum, 3 jours, une
                                semaine, et infini (la journée s’arrête quand le
                                dernier joueur a fini son duel).
                            </Text>
                        </View>
                        <View style={Style.inputContainer}>
                            <Select
                                items={dayItems}
                                value={duration}
                                setValue={setDuration}
                                backgroundColor="#EBECF0"
                                height={41}
                                width={161}
                            />
                        </View>
                    </View>
                    <View style={Style.container}>
                        <View style={Style.titleContainer}>
                            <Text style={Style.title}>
                                NIVEAU DE DIFFICULTÉ
                            </Text>
                        </View>
                        <View style={Style.listContainer}>
                            <Text>
                                {`Choisis le niveau de difficulté : facile, moyen,
                            difficile, génie et random (chaque question aura un
                            niveau de difficulté différent).`}
                            </Text>
                        </View>
                        <View style={Style.inputContainer}>
                            <Select
                                items={levelItems}
                                value={difficulty}
                                setValue={setDifficulty}
                                backgroundColor="#EBECF0"
                                height={41}
                                width={161}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    flex: 1,
                    minWidth: 375,
                    maxWidth: 375,
                    minHeight: 60,
                    maxHeight: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
            >
                <TouchableOpacity
                    style={{
                        ...Style.buttonAdd,
                        borderWidth: 1,
                        borderColor: '#1B2444',
                    }}
                    onPress={onCreate}
                >
                    <Text
                        style={{ ...Style.buttonAddText, color: '#1B2444' }}
                    >{`  SUIVANT`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
    },
    title: {
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 30,
    },
    buttonAdd: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 194,
        maxWidth: 194,
    },
    buttonAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
    },
})
