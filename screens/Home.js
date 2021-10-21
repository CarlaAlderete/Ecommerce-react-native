import React, {useState} from "react"
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { connect } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FontAwesome5} from '@expo/vector-icons'
import productsActions from "../redux/actions/productsActions"



const Home = ({navigation, route, match, product, params, getProductByCategory}, props) => {
  const scrollY = React.useRef(new Animated.Value(0)).current
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [categoryHome, setCategoryHome]= useState(null)
  
  const handlerCategory=(item)=>{
    console.log(item)
    setCategoryHome(item)
    getProductByCategory(item)
    navigation.navigate("Gallery", categoryHome)
    }
  
  const { width, height } = Dimensions.get("screen")
  const ITEM_WIDTH = width * 0.76
  const ITEM_HEIGHT = ITEM_WIDTH * 1.47
  const imageW = width / 2
  const images = [
    {
      img: "https://i.postimg.cc/BbhLKnZr/17.png",
      link: "Check out our latest trends",
    },
    {
      img: "https://i.postimg.cc/66G4VjPx/home3.png",
      link: "There is no place like home",
    },
    { img: "https://i.postimg.cc/cCsFRrC2/home2.png", link: "Categories" },
  ]
  const data = images.map((image, index) => ({
    key: String(index),
    photo: image.img,
    link: image.link,
  }))

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "Bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "Kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "Decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "Giftcard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "Sale" },
  ]

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        LisHeaderComponent={
          <>
            <Text>{data.categories}</Text>
          </>
        }
        data={data}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height,
          ]
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-height, 0, height],
          })
          return (
            <View>
              {item.link == "Categories" ? (
                <View style={styles.categoriesContainer}>
                  <Text style={styles.titleCategory}>CATEGORIES</Text>
                  <FlatList
                    data={categories}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            display: "flex",
                            width: width - 40,
                            height: width - 40,
                            marginTop: 15,
                            margin: "auto",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View key={index}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Gallery", {
                                  category: item.category,
                                })
                              }
                            >
                              <Image
                                source={{ uri: item.src }}
                                style={{
                                  display: "flex",
                                  width: width - 40,
                                  height: width - 40,
                                  resizeMode: "cover",

                                  shadowColor: "#000",
                                  shadowOpacity: 0.5,
                                  borderRadius: 16,
                                  margin: "auto",
                                  shadowOffset: {
                                    width: 0,
                                    height: 0,
                                  },
                                  shadowRadius: 20,
                                }}
                              />
                              <Text style={styles.textCategory}>
                                {item.category}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    overflow: "hidden",
                    alignItems: "center",
                  }}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: width,
                      height: height,
                      resizeMode: "cover",
                      transform: [
                        {
                          translateY,
                        },
                      ],
                    }}
                  />
                  {item.link.includes("Check") && (
                    <View style={styles.boxCallToAction}>
                      <Text style={styles.textCallToAction}>{item.link} </Text>
                      <FontAwesome5
                        name="wpexplorer"
                        size={40}
                        color="black"
                        style={styles.iconExplore}
                      />
                    </View>
                  )}
                  {item.link.includes("home") && (
                    <View style={styles.boxQuote}>
                      <Text style={styles.textQuote}>{item.link} </Text>
                      <FontAwesome5
                        name="couch"
                        size={25}
                        color="black"
                        style={styles.icon}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )
        }}
        ListFooterComponent={
          <View
            style={{ backgroundColor: "#dabea8de", width: "100%", height: 25 }}
          >
            <Text
              style={{ marginStart: 150, fontSize: 12, fontWeight: "bold" }}
            >
              Mind-Hub 2021
            </Text>
          </View>
        }
      />
    </View>
  )
}
const mapStateToProps = (state) => {
    return {
      products: state.products.products,
      productsCategory: state.products.productsCategory
    }
}

const mapDispatchToProps = {
  getProductByCategory: productsActions.getProductByCategory
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)

const width = Dimensions.get("window").width - 40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    width: width / 2 - 10,
    height: width / 2 - 10,
    margin: 5,
    padding: 5,
  },
  boxCallToAction: {
    backgroundColor: "rgba(0, 0, 0, 0.538)",
    backgroundColor: "#e3cebc",
    width: width + 46.5,
    height: width + 46.5,
    position: "absolute",
    zIndex: 300,
    paddingTop: 250,
    top: -250,
    right: -3,
    borderRadius: 250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    color: "#060B34",
  },
  textCallToAction: {
    color: "rgb(245, 245, 245)",
    color: "rgb(41, 40, 40)",
    textAlign: "center",
    fontSize: 23,
    padding: 10,
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
    fontWeight: "bold",
  },

  categoriesContainer: {
    minHeight: "100%",
    flex: 1,
    alignContent: "center",
    marginLeft: 20,
  },
  titleCategory: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 10,
    color: "rgba(0, 0, 0, 0.638)",
    marginBottom: 15,
  },
  textCategory: {
    fontSize: 20,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.638)",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.69)",
    height: 40,
    width: width,
    position: "absolute",
    zIndex: 200,
    top: 35,
  },
  boxQuote: {
    color: "#060B34",
    fontSize: 20,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    width: width + 35,
    height: 120,
    position: "absolute",
    zIndex: 200,
    top: 0,
    left: 0,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
  },
  textQuote: {
    color: "#060B34",
    fontSize: 23,
    fontWeight: "bold",
    paddingStart: 10,
    textAlign: "center",
  },
  icon:{
    alignSelf: "center",
    color: "rgb(41, 40, 40)",
    marginTop:12,
  },
  iconExplore: {
    alignSelf: "center",
    color: "rgb(41, 40, 40)",
  }
})
