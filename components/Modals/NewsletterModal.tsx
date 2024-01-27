import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface NewsletterModalProps {
  visible: boolean;
  onClose: any;
  newsletter: any;
}
const NewsletterModal = ({
  visible,
  onClose,
  newsletter,
}: NewsletterModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{newsletter?.name}</Text>
          <Text style={styles.modalDescription}>{newsletter?.description}</Text>
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
  },
});

export default NewsletterModal;
